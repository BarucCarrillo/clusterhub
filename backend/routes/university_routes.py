from flask import Blueprint,request,jsonify
from database import get_db_connection


university_bp = Blueprint('university', __name__)






@university_bp.route('/university', methods=['GET', 'POST'])
def manage_universities():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM universidad")
            universities = cursor.fetchall()
        connection.close()
        return jsonify(universities)

    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO universidad (nombre, direccion_universidad,ciudad_id) VALUES (%s, %s)", (data['nombre'],data['direccion'], data['ciudad_id']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})
    
@university_bp.route('/university_city/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def manage_university_city(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM universidad WHERE ciudad_id = %s", (id,))
            universities = cursor.fetchall()
        connection.close()
        return jsonify(universities)
    
    
    
    
@university_bp.route('/uni_building/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def manage_uni_building(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM edificio WHERE universidad_id = %s", (id,))
            buildings = cursor.fetchall()
        connection.close()
        return jsonify(buildings)


@university_bp.route('/building', methods=['GET', 'POST'])
def manage_buildings():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM edificio")
            buildings = cursor.fetchall()
        connection.close()
        return jsonify(buildings)

    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO edificio (nombre_edificio, tipo_edificio, universidad_id) VALUES (%s, %s, %s)", (data['nombre'], data['direccion'], data['universidad_id']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})

@university_bp.route('/classroom_building/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def manage_classroom_building(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM aula WHERE edificio_id = %s", (id,))
            classrooms = cursor.fetchall()
        connection.close()
        return jsonify(classrooms)
    
    
@university_bp.route('/classroom', methods=['GET', 'POST'])
def manage_classrooms():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM aula")
            classrooms = cursor.fetchall()
        connection.close()
        return jsonify(classrooms)

    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO aula (nombre_aula, tipo_aula, edificio_id) VALUES (%s, %s, %s)", (data['nombre'], data['capacidad'], data['edificio_id']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})