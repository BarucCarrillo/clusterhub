from flask import Blueprint, request, jsonify
from database import get_db_connection
from utils.bcrypt_utils import hash_password, check_password

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET', 'POST'])
def manage_users():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users")
            users = cursor.fetchall()
        connection.close()
        return jsonify(users)
    
    elif request.method == 'POST':
        data = request.get_json()
        hashed_password = hash_password(data['contrasena'])
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO users (nombre, apellidos, correo, contrasena) VALUES (%s, %s, %s, %s)", 
                           (data['nombre'], data['apellidos'], data['correo'], hashed_password))
            connection.commit()
        connection.close()
        return jsonify({"message": "Usuario creado exitosamente"}), 200


@user_bp.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def manage_user(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id_user=%s", (id,))
            user = cursor.fetchone()
        connection.close()
        if user:
            return jsonify(user)
        return jsonify({"error": "User not found"}), 404

    elif request.method == 'PUT':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("UPDATE users SET nombre=%s, apellidos=%s, correo=%s WHERE id_user=%s", 
                           (data['nombre'], data['apellidos'], data['correo'], id))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM users WHERE id_user=%s", (id,))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})