from flask import Blueprint, request, jsonify
import pymysql
from database import get_db_connection

sensor_bp = Blueprint('sensor', __name__)

@sensor_bp.route('/sensor', methods=['GET', 'POST'])
def manage_sensors():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM sensor")
            sensors = cursor.fetchall()
        connection.close()
        return jsonify(sensors), 200
    
    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO sensor (nombre_sensor,  fecha, tipo_sensor,pais,estado,ciudad,edificio, aula, user_id, topic) VALUES (%s,  NOW(), %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                           (data['nombre'], data['tipo_sensor'], data['pais'], data['estado'], data['ciudad'], data['edificio'], data['aula'], data['user_id'], data['topic']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"}), 200
    
    
@sensor_bp.route('/sensor/<int:id>', methods=['GET', 'PATCH', 'DELETE','POST'])
def manage_sensor(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM sensor WHERE id_sensor=%s", (id,))
            sensor = cursor.fetchone()
        connection.close()
        if sensor:
            return jsonify(sensor)
        return jsonify({"error": "Sensor not found"}), 404

    elif request.method == 'PATCH':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("UPDATE sensor SET nombre_sensor=%s, tipo_sensor=%s, pais=%s, estado=%s, ciudad=%s, edificio=%s, aula=%s, user_id=%s, topic=%s WHERE id_sensor=%s",
                           (data['nombre'], data['tipo_sensor'], data['pais'], data['estado'], data['ciudad'], data['edificio'], data['aula'], data['user_id'], data['topic'], id))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"}), 200

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sensor WHERE id_sensor=%s", (id,))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"}) ,200
    elif request.method == 'POST':
        data = request.get_json()
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO sensor (nombre_sensor, fecha, tipo_sensor, pais, estado, ciudad, universidad, edificio, aula, user_id, topic) "
                    "VALUES (%s, NOW(), %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (data['nombre'], data['tipo_sensor'], data['pais'], data['estado'], data['ciudad'], data['universidad'], data['edificio'], data['aula'], id, data['topic'])
                )
                connection.commit()
            return jsonify({"status": "success"}), 201
        except pymysql.MySQLError as e:
            return jsonify({"error": str(e)}), 500

    
@sensor_bp.route('/sensor_user/<int:id>', methods=['GET'])
def get_sensor_data(id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.callproc('cp_infoSensorByUser', (id,))
            sensor = cursor.fetchall()
        connection.close()
        
        if sensor:
            return jsonify(sensor), 200
        else:
            return jsonify({"message": "No sensors found"}), 404
    except pymysql.MySQLError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@sensor_bp.route('/sensor_to_widgets', methods=['POST'])
def sensor_to_widget():
    connection = get_db_connection()
    data = request.get_json()
    
    # Validar que los datos necesarios están en la solicitud
    if 'grafica_id' not in data or 'sensor_id' not in data:
        return jsonify({"error": "grafica_id and sensor_id are required"}), 400

    try:
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO graficas_sensor (dashboard_graficas_id, sensor_id) VALUES (%s, %s)",
                           (data['grafica_id'], data['sensor_id']))
            connection.commit()
        return jsonify({"status": "success"}), 201
    except pymysql.MySQLError as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()
        
        
@sensor_bp.route('/sensor_to_widgets', methods=['DELETE'])
def delete_sensor_from_widget():
    connection = get_db_connection()
    data = request.get_json()
    # Validar que los datos necesarios están en la solicitud
    if 'grafica_id' not in data or 'sensor_id' not in data:
        return jsonify({"error": "grafica_id and sensor_id are required"}), 400

    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM graficas_sensor WHERE dashboard_graficas_id = %s AND sensor_id = %s",
                           (data['grafica_id'], data['sensor_id']))
            connection.commit()
        return jsonify({"status": "success"}), 200
    except pymysql.MySQLError as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()
    
@sensor_bp.route('/sensor_to_widget/<int:id>', methods=['GET','DELETE','PATCH'])
def sensor_widget(id):
    if request.method == 'GET':
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM graficas_sensor WHERE id_sensor_grafica=%s", (id,))
            sensor = cursor.fetchone()
        connection.close()
        if sensor:
            return jsonify(sensor)
        return jsonify({"error": "Sensor not found"}), 404
   
    elif request.method == 'DELETE':
        connection = get_db_connection()
        data = request.get_json()
        try:
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM graficas_sensor WHERE id_sensor_grafica=%s", (data['id']))
                connection.commit()
            return jsonify({"status": "success"}), 200
        except pymysql.MySQLError as e:
            return jsonify({"error": str(e)}), 500
        finally:
            connection.close()
    elif request.method == 'PATCH':
        connection = get_db_connection()
        data = request.get_json()
        try:
            with connection.cursor() as cursor:
                cursor.execute("UPDATE graficas_sensor SET  sensor_id=%s WHERE id_sensor_grafica=%s",
                               ( data['sensor_id'], id))
                connection.commit()
            return jsonify({"status": "success"}), 200
        except pymysql.MySQLError as e:
            return jsonify({"error": str(e)}), 500
        finally:
            connection.close()


@sensor_bp.route('/infoSensorByTopic', methods=['POST'])
def infoSensorByTopic():
                connection = get_db_connection()
                data = request.get_json()
                topic = data.get('topic')
                sensor_data = data.get('data')  # Assuming sensor_data is part of the request

                if not topic or not sensor_data:
                    return jsonify({"error": "Topic and sensor_data are required"}), 400

                # Fetch sensor info by topic
                with connection.cursor() as cursor:
                    cursor.execute("SELECT id_sensor FROM sensor WHERE topic=%s", (topic,))
                    sensor = cursor.fetchone()
                
                if sensor:
                    sensor_id = sensor['id_sensor']

                    # Insert sensor data using the fetched sensor_id
                    try:
                        with connection.cursor() as cursor:
                            cursor.execute("INSERT INTO sensor_data (data, sensor_id) VALUES (%s, %s)", (sensor_data, sensor_id))
                        connection.commit()
                        return jsonify({"message": "Sensor data inserted successfully"}), 201
                    except Exception as e:
                        connection.rollback()
                        return jsonify({"error": str(e)}), 500
                    finally:
                        connection.close()
                else:
                    return jsonify({"error": "Sensor not found"}), 404

@sensor_bp.route('/sensor_data/<int:id>', methods=['GET'])
def get_sensor_data_by_id(id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.callproc('cp_infoSensorByGrafic', (id,))
        sensor_data = cursor.fetchall()
    connection.close()
    if sensor_data:
        return jsonify(sensor_data), 200
    return jsonify({"error": "Sensor data not found"}), 404


@sensor_bp.route('/sensor_grafica/<int:id>', methods=['GET'])
def get_sensor_grafica(id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.callproc('cp_graficaWithSensor', (id,))
        sensor_data = cursor.fetchall()
    connection.close()
    if sensor_data:
        return jsonify(sensor_data), 200
    return jsonify({"error": "Sensor data not found"}), 404



@sensor_bp.route('/sensor_data_info', methods=['GET'])
def get_sensor_data_info():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.callproc("cp_infoSensorData")
        sensor_data = cursor.fetchall()
    connection.close()
    if sensor_data:
        return jsonify(sensor_data), 200
    return jsonify({"error": "Sensor data not found"}), 404