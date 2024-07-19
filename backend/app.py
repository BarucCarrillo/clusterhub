from flask import Flask, request, jsonify, make_response
import pymysql.cursors
import jwt
import bcrypt
import datetime
from dotenv import load_dotenv
import os

# encoded_jwt = jwt.encode({"token": "token"},"SECRET_KEY", algorithm="HS256");

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = 'cluster_hub_secret_key'


connection = pymysql.connect(host="localhost",
                       user="root",
                       password="",
                       database="cluster_hub",
                       charset="utf8mb4",
                       cursorclass=pymysql.cursors.DictCursor)




@app.route('/')
def home():
    return "Welcome!"



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    with connection.cursor() as cursor:
         cursor.execute("SELECT * FROM users WHERE correo=%s",(data['correo']))
         user = cursor.fetchone()
         if user:
            if bcrypt.checkpw(data['contrasena'].encode('utf-8'), 
                              user['contrasena'].encode('utf-8')):
                
                encoded_jwt = jwt.encode({"nombre":user['nombre'],
                                          "apellidos":user["apellidos"],
                                          "correo":data['correo'],
                                          "exp":datetime.datetime.utcnow()+datetime.timedelta(hours=24)
                                        }, app.config['SECRET_KEY'], algorithm="HS256")
                
                response =  { "message": "Inicio de sesión exitoso",
                   "id": user['id_user'],
                   "nombre": user['nombre'],
                    "apellidos": user['apellidos'],
                    "correo": user['correo'],
                    "token": encoded_jwt
                    
                    }
                return jsonify(response), 200
            else:
                return jsonify({"error": "Invalid username/password"})
         else:
                return jsonify({"error": "Invalid username/password"})


# @app.route('/logout', methods=['POST'])
# def logout():
#     s.cookies.clear()
#     return jsonify({"status": "success"})

@app.route('/verify', methods=['POST'])
def verify():
    data = request.get_json()
    token = data.get('token')  # Obtenemos el token del cuerpo de la solicitud
    if not token:
        return jsonify({"error": "Token is missing"}), 400
    
    try:
        decoded_jwt = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        print("Decoded JWT Token: ", decoded_jwt)
        return jsonify({"status": "success"})
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"})
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"})
@app.route('/users', methods=['GET','POST'])
def users():
        if request.method == 'GET':
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users")
                users = cursor.fetchall()
                return jsonify(users)
        elif request.method == 'POST':
            data = request.get_json()
            password = data['contrasena']
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO users (nombre, apellidos,correo,contrasena) VALUES (%s, %s,%s,%s)", (data['nombre'], data['apellidos'],data['correo'],hashed_password.decode('utf-8')))
                connection.commit()
                token = jwt.encode({"correo":data['correo'],"exp":datetime.datetime.utcnow()+datetime.timedelta(hours=24)
                                    }, app.config['SECRET_KEY'], algorithm="HS256")
                print("Generated JWT Token: ", token)
                return jsonify({"status": "success"})

@app.route('/users/<int:id>', methods=['GET','PUT','DELETE'])
def user(id):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id_user=%s", (id))
            user = cursor.fetchone()
            if not user:
                return jsonify({"error": "User not found"})
            return jsonify(user)
    elif request.method == 'PUT':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id_user=%s", (id))
            user = cursor.fetchone()
            if not user:
                return jsonify({"error": "User not found"})
            cursor.execute("UPDATE users SET nombre=%s, apellidos=%s, correo=%s  WHERE id_user=%s", (data['nombre'], data['apellidos'], data['correo'] ,id))
            connection.commit()
            return jsonify({"status": "success"})
    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id_user=%s", (id))
            user = cursor.fetchone()
            if not user:
                return jsonify({"error": "User not found"})
            cursor.execute("DELETE FROM users WHERE id=%s", (id))
            connection.commit()
            return jsonify({"status": "success"})


@app.route('/userChangePassword/<int:id>/', methods=['PATCH'])
def change_password(id):
    data = request.get_json()
    with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM users WHERE id_user=%s", (id))
                    user = cursor.fetchone()
                    if not user:
                        return jsonify({"error": "User not found"})
                    if bcrypt.checkpw(data['password'].encode('utf-8'), user['contrasena'].encode('utf-8')):
                        if data['new_password'] == data['confirm_password']:
                            new_password = bcrypt.hashpw(data['new_password'].encode('utf-8'), bcrypt.gensalt())
                            cursor.execute("UPDATE users SET contrasena=%s WHERE id_user=%s", (new_password.decode('utf-8'), id))
                            connection.commit()
                            return jsonify({"status": "success"})
                        else:
                            return jsonify({"error": "Passwords do not match"})
                    else:
                        return jsonify({"error": "Invalid password"})
        
@app.route('/sensor', methods=['GET','POST'])
def sensor():
        if request.method == 'GET':
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM sensor")
                sensor = cursor.fetchall()
                return jsonify(sensor)
        elif request.method == 'POST':
            data = request.get_json()
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO sensor (nombre_sensor, datos,fecha,tipo_sensor_id,aula_id,user_id,topic) VALUES (%s, %s,NOW(),%s,%s,%s,%s)", (data['nombre'], data['datos'],data['tipo_sensor'],data['aula'],data['user_id'],data['topic']))
                connection.commit()
                return jsonify({"status": "success"})
            
            
@app.route('/sensor/<int:id>', methods=['POST','GET','PUT','DELETE'])

def sensor_id(id):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM sensor WHERE id_sensor=%s", (id))
            sensor = cursor.fetchone()
            if not sensor:
                return jsonify({"error": "Sensor not found"})
            return jsonify(sensor)
    elif request.method == 'PUT':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM sensor WHERE id_sensor=%s", (id))
            sensor = cursor.fetchone()
            if not sensor:
                return jsonify({"error": "Sensor not found"})
            cursor.execute("UPDATE sensor SET nombre_sensor=%s, datos=%s, tipo_sensor_id=%s, aula_id=%s, user_id=%s, topic=%s WHERE id_sensor=%s", (data['nombre'], data['datos'], data['tipo_sensor'], data['aula'], data['user_id'], data['topic'], id))
            connection.commit()
            return jsonify({"status": "success"})
    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM sensor WHERE id_sensor=%s", (id))
            sensor = cursor.fetchone()
            if not sensor:
                return jsonify({"error": "Sensor not found"})
            cursor.execute("DELETE FROM sensor WHERE id_sensor=%s", (id))
            connection.commit()
            return jsonify({"status": "success"})
    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            data = request.get_json()
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO sensor (nombre_sensor, datos,fecha,tipo_sensor_id,aula_id,user_id,topic) VALUES (%s, %s,NOW(),%s,%s,%s,%s)", (data['nombre'], data['datos'],data['tipo_sensor'],data['aula'],id,data['topic']))
            connection.commit()
            return jsonify({"status": "success"})
        
        
        
@app.route('/dashboard', methods=['GET','POST'])
def dashboard():
       if request.method == 'GET':
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM dashboard")
                dashboard = cursor.fetchall()
                return jsonify(dashboard)
       elif request.method == 'POST':
            data = request.get_json()
            print(data)
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO dashboards (nombre_dashboard,destacado, user_id) VALUES (%s, %s,%s)", (data['nombre'],data['destacado'], data['user_id']))
                connection.commit()
                return jsonify({"status": "success"})
            
            
            
@app.route('/dashboard/<int:id>', methods=['GET','PUT','DELETE','POST'])
def dashboard_id(id):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM dashboard WHERE id_dashboard=%s", (id))
            dashboard = cursor.fetchone()
            if not dashboard:
                return jsonify({"error": "Dashboard not found"})
            return jsonify(dashboard)
    elif request.method == 'PUT':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM dashboard WHERE id_dashboard=%s", (id))
            dashboard = cursor.fetchone()
            if not dashboard:
                return jsonify({"error": "Dashboard not found"})
            cursor.execute("UPDATE dashboard SET nombre_dashboard=%s,descripcion=%s, destacado=%s WHERE id_dashboard=%s", (data['nombre'],data['descripcion'], data['destacado'], id))
            connection.commit()
            return jsonify({"status": "success"})
    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM dashboard WHERE id_dashboard=%s", (id))
            dashboard = cursor.fetchone()
            if not dashboard:
                return jsonify({"error": "Dashboard not found"})
            cursor.execute("DELETE FROM dashboard WHERE id_dashboard=%s", (id))
            connection.commit()
            return jsonify({"status": "success"})
    elif request.method == 'POST':
            data = request.get_json()
            # Asegúrate de que 'destacado' sea un valor booleano
            data['destacado'] = True if data.get('destacado', False) else False

            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO dashboards (nombre_dashboard, descripcion, destacado, user_id) VALUES (%s, %s, %s, %s)",
                    (data['nombre'], data['descripcion'], data['destacado'], id)
                )
                connection.commit()
                dashboard_id = cursor.lastrowid

            return jsonify({"status": "success", "id": dashboard_id})
  
@app.route('/dashboard_user/<int:id>', methods=['GET','POST'])
def dashboard_user(id):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM dashboards WHERE user_id=%s", (id))
            dashboards = cursor.fetchall()
            return jsonify(dashboards)
    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO dashboards (nombre_dashboard, destacado, user_id) VALUES (%s, %s, %s)", (data['nombre'], data['destacado'], id))
            connection.commit()
            return jsonify({"status": "success"})
        
@app.route('/invite_user', methods=['POST'])
def invite_user():
    data = request.get_json()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM users WHERE correo=%s", (data['correo']))
        user = cursor.fetchone()
        if user:
            cursor.execute("SELECT * FROM dashboards WHERE id_dashboard=%s", (data['dashboard_id']))
            dashboard = cursor.fetchone()
            if dashboard:
                cursor.execute("INSERT INTO dashboard_invitados ( dashboard_id,user_id) VALUES (%s, %s)", ( dashboard['id_dashboard'],user['id_user'],))
                connection.commit()
                return jsonify({"status": "success"})
            else:
                return jsonify({"error": "Dashboard not found"})
        else:
            return jsonify({"error": "User not found"})
        
@app.route('/dashboard_graficas', methods=['GET', 'POST'])
def dashboard_graficas():
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM dashboard_graficas")
            dashboard_graficas = cursor.fetchall()
            return jsonify(dashboard_graficas)
    elif request.method == 'POST':
        data = request.get_json()
        dashboard_id = data['id']
        graficas_ids = data['graficas_id']
        
        try:
            with connection.cursor() as cursor:
                for grafica_id in graficas_ids:
                    cursor.execute("INSERT INTO dashboard_graficas (dashboard_id, graficas_id) VALUES (%s, %s)", (dashboard_id, grafica_id))
                connection.commit()
            return jsonify({"status": "success"})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)})

@app.route('/graficas', methods=['GET','POST','DELETE'])
def graficas():
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM graficas")
            graficas = cursor.fetchall()
            return jsonify(graficas)
    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO graficas (nombre_grafica) VALUES (%s)", (data['nombre']))
            connection.commit()
            return jsonify({"status": "success"})
    elif request.method == 'DELETE':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM graficas WHERE id_grafica=%s", (data['id']))
            connection.commit()
            return jsonify({"status": "success"})
    

if __name__ == '__main__':
    host = os.getenv('HOST')
    app.run(host=host,port=5000)