from flask import Blueprint, request, jsonify
from database import get_db_connection


widgets_bp = Blueprint('widget', __name__)

@widgets_bp.route('/dashboard_graficas', methods=['GET', 'POST'])
def dashboard_graficas():
    connection = get_db_connection()
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

@widgets_bp.route('/graficas', methods=['GET','POST','DELETE'])
def graficas():
    connection = get_db_connection()
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
        