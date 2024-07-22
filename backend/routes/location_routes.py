from flask import Blueprint, request, jsonify
from database import get_db_connection

location_bp = Blueprint('location', __name__)


@location_bp.route('/country', methods=['GET', 'POST'])
def manage__country():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM pais")
            locations = cursor.fetchall()
        connection.close()
        return jsonify(locations)

    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO pais (nombre) VALUES (%s)", (data['nombre'],))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})
    
    

    
    
@location_bp.route('/state', methods=['GET', 'POST'])
def manage_state():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM estado")
            locations = cursor.fetchall()
        connection.close()
        return jsonify(locations)

    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO estado (nombre, pais_id) VALUES (%s, %s)", (data['nombre'], data['pais_id']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})
    

@location_bp.route('/state_country/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def manage_state_country(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM estado WHERE pais_id = %s", (id,))
            locations = cursor.fetchall()
        connection.close()
        return jsonify(locations)

    
@location_bp.route('/city_state/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def manage_city_state(id):
    connection = None
    try:
        connection = get_db_connection()
        if request.method == 'GET':
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM ciudad WHERE estado_id = %s", (id,))
                locations = cursor.fetchall()
            return jsonify(locations)
        # You can handle PUT and DELETE methods here
        elif request.method == 'PUT':
            # Handle PUT request logic here
            pass
        elif request.method == 'DELETE':
            # Handle DELETE request logic here
            pass
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if connection:
            connection.close()
    

@location_bp.route('/city', methods=['GET', 'POST'])
def manage_locations():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM ciudad")
            locations = cursor.fetchall()
        connection.close()
        return jsonify(locations)

    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO location (nombre, latitud, longitud) VALUES (%s, %s, %s)",
                           (data['nombre'], data['latitud'], data['longitud']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})
    
    
    
