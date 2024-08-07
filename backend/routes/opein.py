import requests
import pymysql
import google.generativeai as genai

# Configura la API de Google Generative AI
genai.configure(api_key='AIzaSyAWWNMQpac9oxQhR-yAbdhcJgnYyrbnAaw')

# Define la URL para obtener las notificaciones
get_notifications_url = 'http://192.168.100.200:5000/notifications_one/9'

# Obtiene las notificaciones desde la API
response = requests.get(get_notifications_url)

# Verifica si la solicitud fue exitosa
if response.status_code == 200:
    # Obtén los datos de las notificaciones en formato JSON
    notification_data_list = response.json()
    
    # Verifica si la lista de notificaciones no está vacía
    if notification_data_list:
        # Obtén el primer elemento de la lista
        notification_data = notification_data_list[0]
        
        # Muestra los datos de la notificación recibida
        print("Datos de la Notificación Recibida:")
        print(notification_data)
        
        # Extrae la información relevante para generar un mensaje
        notification_message = (
            f"Fecha: {notification_data.get('fecha', 'No Date')}\n"
            f"ID de Notificación: {notification_data.get('id_notificacion', 'No ID')}\n"
            f"Mensaje: {notification_data.get('mensaje', 'No Message')}\n"
            f"ID de Usuario: {notification_data.get('user_id', 'No User ID')}"
        )
        
        # Usa la IA para generar una respuesta basada en la notificación
        prompt = f"Por favor, proporciona una recomendación basada en la siguiente notificación:\n\n{notification_message}"
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        ai_response = model.generate_content([prompt])
        recommendation = ai_response.text.strip()
        
        # Trunca el título y la descripción según las restricciones
        title = "Recomendación Basada en Notificación"[:45]
        description = recommendation[:200]
        
        # Trunca las recomendaciones a 45 caracteres
        recommendation1 = description[:45]
        recommendation2 = recommendation1[:45]  # Si solo se genera una recomendación, se usa la misma
        recommendation3 = recommendation2[:45]  # Similar al anterior
        
        # Define los datos de la recomendación para enviar
        recommendation_data = {
            "titulo": title,
            "descripcion": description,
            "url1": "",  # Añade URLs si las tienes
            "url2": "",
            "url3": "",
            "user_id": "9",  # Cambia el ID de usuario según sea necesario
            "recomendacion1": recommendation1,
            "recomendacion2": recommendation2,
            "recomendacion3": recommendation3
        }
        
        # Configura la conexión a la base de datos
        db_connection = pymysql.connect(
            host='localhost',  # Cambia según tu configuración
            user='root',  # Cambia según tu configuración
            password='',  # Cambia según tu configuración
            database='cluster_hub'  # Cambia según tu configuración
        )
        
        try:
            with db_connection.cursor() as cursor:
                # Inserta los datos en la base de datos
                sql = """
                INSERT INTO recomendaciones (titulo, descripcion, url1, url2, url3, user_id, recomendacion1, recomendacion2, recomendacion3)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    recommendation_data['titulo'],
                    recommendation_data['descripcion'],
                    recommendation_data['url1'],
                    recommendation_data['url2'],
                    recommendation_data['url3'],
                    recommendation_data['user_id'],
                    recommendation_data['recomendacion1'],
                    recommendation_data['recomendacion2'],
                    recommendation_data['recomendacion3']
                ))
                db_connection.commit()
                print('Recomendación guardada en la base de datos exitosamente.')
        except Exception as e:
            print(f'Error al guardar la recomendación en la base de datos: {e}')
        finally:
            db_connection.close()
    else:
        print('No se recibieron datos de notificación.')
else:
    print(f'Error al obtener las notificaciones: {response.status_code}')
