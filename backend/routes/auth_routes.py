from flask import Blueprint, request, jsonify
from database import get_db_connection
from utils.jwt_utils import encode_token,decode_jwt
from utils.bcrypt_utils import check_password, hash_password

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM users WHERE correo=%s", (data['correo'],))
        user = cursor.fetchone()
    connection.close()
    
    if user and check_password(data['contrasena'], user['contrasena']):
        token = encode_token({
            
            "nombre": user['nombre'],
            "apellidos": user['apellidos'],
            "correo": data['correo']
        })
        return jsonify({
            "message": "Inicio de sesión exitoso",
            "id": user['id_user'],
            "nombre": user['nombre'],
            "apellidos": user['apellidos'],
            "correo": user['correo'],
            "token": token
        }), 200
    
    return jsonify({"error": "Invalid username/password", "correo": data['correo'], "contrasena": data['contrasena']}), 401



@auth_bp.route('/userChangePassword/<int:id>/', methods=['PATCH'])
def change_password(id):
    data = request.get_json()
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id_user=%s", (id,))
            user = cursor.fetchone()
            if not user:
                return jsonify({"error": "User not found"}), 404
            
            if check_password(data['password'], user['contrasena']):
                if data['new_password'] == data['confirm_password']:
                    new_hashed_password = hash_password(data['new_password'])
                    cursor.execute("UPDATE users SET contrasena=%s WHERE id_user=%s", (new_hashed_password, id))
                    connection.commit()
                    return jsonify({"status": "success"}), 200
                else:
                    return jsonify({"error": "Passwords do not match"}), 400
            else:
                return jsonify({"error": "Invalid password"}), 400
    finally:
        connection.close()


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/verify', methods=['POST'])
def verify():
    data = request.get_json()
    token = data.get('token')  # Obtenemos el token del cuerpo de la solicitud
    if not token:
        return jsonify({"error": "Token is missing"}), 400
    
    decoded_jwt = decode_jwt(token)
    if decoded_jwt is None:
        return jsonify({"error": "Invalid or expired token"}), 401
    
    print("Decoded JWT Token: ", decoded_jwt)
    return jsonify({"status": "success"}), 200