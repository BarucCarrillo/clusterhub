from flask import Flask, request, jsonify
import pymysql.cursors
import jwt
import bcrypt
import datetime




# encoded_jwt = jwt.encode({"token": "token"},"SECRET_KEY", algorithm="HS256");



app = Flask(__name__)

app.config['SECRET_KEY'] = 'cluster_hub_secret_key'


connection = pymysql.connect(host="localhost",
                       user="root",
                       password="root",
                       database="cluster_hub",
                       charset="utf8mb4",
                       cursorclass=pymysql.cursors.DictCursor)



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


