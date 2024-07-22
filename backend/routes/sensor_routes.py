from flask import Blueprint, request, jsonify
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
        return jsonify(sensors)

    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO sensor (nombre_sensor, datos, fecha, tipo_sensor_id, aula_id, user_id, topic) VALUES (%s, %s, NOW(), %s, %s, %s, %s)",
                           (data['nombre'], data['datos'], data['tipo_sensor'], data['aula'], data['user_id'], data['topic']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})

@sensor_bp.route('/sensor/<int:id>', methods=['GET', 'PUT', 'DELETE','POST'])
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

    elif request.method == 'PUT':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("UPDATE sensor SET nombre_sensor=%s, datos=%s, tipo_sensor_id=%s, aula_id=%s, user_id=%s, topic=%s WHERE id_sensor=%s",
                           (data['nombre'], data['datos'], data['tipo_sensor'], data['aula'], data['user_id'], data['topic'], id))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sensor WHERE id_sensor=%s", (id,))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})
    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO sensor (nombre_sensor,  fecha, tipo_sensor_id, aula_id, user_id, topic) VALUES (%s, NOW(),  %s, %s, %s, %s)",
                           (data['nombre'],  data['tipo_sensor'], data['aula'], id, data['topic']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})



@sensor_bp.route('/sensor_type', methods=['GET', 'POST'])
def manage_sensor_types():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM tipo_sensor")
            sensor_types = cursor.fetchall()
        connection.close()
        return jsonify(sensor_types)

    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO tipo_sensor (nombre_tipo_sensor) VALUES (%s)", (data['nombre'],))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})



@sensor_bp.route('/sensor_type/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def manage_sensor_type(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM tipo_sensor WHERE id_tipo_sensor=%s", (id,))
            sensor_type = cursor.fetchone()
        connection.close()
        if sensor_type:
            return jsonify(sensor_type)
        return jsonify({"error": "Sensor type not found"}), 404

    elif request.method == 'PUT':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("UPDATE tipo_sensor SET nombre_tipo_sensor=%s WHERE id_tipo_sensor=%s",
                           (data['nombre'], id))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM tipo_sensor WHERE id_tipo_sensor=%s", (id,))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})
    
@sensor_bp.route('/sensor_user/<int:id>', methods=['GET'])
def get_sensor_data(id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.callproc('cp_GetSensorDetailsByUser', (id,))
        sensor = cursor.fetchall()
    connection.close()
    if sensor:
        return jsonify(sensor)
    return jsonify({"error": "Sensor not found"}), 404