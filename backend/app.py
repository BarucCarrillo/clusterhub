from flask import Flask, jsonify, request
from config import Config
from routes.user_routes import user_bp
from routes.auth_routes import auth_bp
from routes.sensor_routes import sensor_bp
from routes.manage_dashboards import dashboard_bp
from routes.widgets_routes import widgets_bp
from routes.notifications import notification_bp
from routes.recomendations import recomendations_bp
import pymysql
import requests
import google.generativeai as genai
import os
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(sensor_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(widgets_bp)
app.register_blueprint(notification_bp)
app.register_blueprint(recomendations_bp)

# Configura la API de Google Generative AI
genai.configure(api_key='AIzaSyAWWNMQpac9oxQhR-yAbdhcJgnYyrbnAaw')

scheduler = BackgroundScheduler()

# Función para insertar notificaciones en la base de datos
def insertar_notificacion(mensaje, user_id, fecha):
    try:
        connection = pymysql.connect(
            host=Config.DB_HOST,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            database=Config.DB_NAME
        )
        with connection.cursor() as cursor:
            sql = "INSERT INTO notificaciones (mensaje, user_id, fecha) VALUES (%s, %s, %s)"
            cursor.execute(sql, (mensaje, user_id, fecha))
        connection.commit()
    except Exception as e:
        print(f"Error al insertar la notificación: {e}")
    finally:
        connection.close()

# Función para verificar si una notificación similar ya existe en la base de datos
def notificacion_existente(mensaje, user_id):
    try:
        connection = pymysql.connect(
            host=Config.DB_HOST,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            database=Config.DB_NAME
        )
        with connection.cursor() as cursor:
            now = datetime.now()
            tiempo_minimo = now - timedelta(minutes=2)
            sql = """
                SELECT COUNT(*) 
                FROM notificaciones 
                WHERE mensaje = %s 
                AND user_id = %s 
                AND fecha >= %s
            """
            cursor.execute(sql, (mensaje, user_id, tiempo_minimo))
            result = cursor.fetchone()
            return result[0] > 0
    except Exception as e:
        print(f"Error al verificar la notificación: {e}")
        return False
    finally:
        connection.close()

@app.route('/')
def home():
    return "Welcome!"
@app.route('/analizar_sensores', methods=['GET'])
def analizar_sensores():
    print("Analizando sensores...")

    # Define el endpoint de tu API para obtener los datos del sensor
    endpoint_url = 'http://192.168.100.200:5000/sensor_data_info'

    # Realiza una solicitud GET para obtener los datos del sensor
    response = requests.get(endpoint_url)

    # Verifica si la solicitud fue exitosa
    if response.status_code == 200:
        # Obtén los datos del sensor en formato JSON
        sensor_data_list = response.json()
        
        # Define un umbral para determinar si el valor es elevado
        umbral = 49.0
        
        # Obtén la hora actual
        now = datetime.now()
        
        # Variable para verificar si se encontró un valor alto
        encontrado_valor_alto = False
        
        # Recorre cada objeto en la lista de datos del sensor
        for sensor_data in sensor_data_list:
            # Obtén los valores del sensor
            nombre_sensor = sensor_data.get('nombre_sensor')
            valor_sensor = sensor_data.get('data')
            tipo_sensor = sensor_data.get('tipo_sensor')
            aula = sensor_data.get('aula')
            user_id = sensor_data.get('user_id')
            fecha = sensor_data.get('fecha')

            # Convierte la fecha del sensor a un objeto datetime
            fecha_sensor = datetime.strptime(fecha, '%a, %d %b %Y %H:%M:%S GMT')
            
            # Calcula la diferencia entre la hora actual y la fecha del sensor
            tiempo_diferencia = now - fecha_sensor
            
            # Analiza si el valor del sensor es elevado y la fecha está dentro del lapso de 2 minutos
            if valor_sensor is not None and tiempo_diferencia < timedelta(minutes=2):
                if valor_sensor > umbral:
                    encontrado_valor_alto = True
                    # Genera el mensaje usando la API de Google Generative AI
                    prompt = (
                        f"El sensor {nombre_sensor} de {tipo_sensor} ha detectado un nivel muy alto de {valor_sensor} "
                        f"en el aula {aula} a las {fecha}."
                    )
                    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
                    response = model.generate_content([prompt])
                    mensaje = response.text
                    print(mensaje)
                    
                    # Verifica si una notificación similar ya existe
                    if not notificacion_existente(mensaje, user_id):
                        # Inserta la notificación en la base de datos
                        insertar_notificacion(mensaje, user_id, fecha_sensor)
                    else:
                        print('Notificación repetida detectada. No se insertará en la base de datos.')
        
        if encontrado_valor_alto:
            # Si se encontró un valor alto, volver a programar la función
            scheduler.add_job(analizar_sensores, 'interval', seconds=45)
            print("Reiniciando el análisis de sensores...")
        
        return jsonify({"status": "success", "message": "Datos analizados y notificaciones generadas."})
    else:
        return jsonify({"status": "error", "message": f"Error al obtener los datos del sensor: {response.status_code}"}), 500

# Añadir el trabajo inicial al scheduler para ejecutarse cada 45 segundos
scheduler.add_job(analizar_sensores, 'interval', seconds=45)

# Iniciar el scheduler
scheduler.start()
print("Scheduler started.")

if __name__ == '__main__':
    app.run(host=Config.HOST, port=5000)