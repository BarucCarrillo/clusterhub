from flask import Blueprint, request, jsonify
from database import get_db_connection
import pymysql

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET', 'POST'])
def manage_dashboards():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM dashboard")
            dashboards = cursor.fetchall()
        connection.close()
        return jsonify(dashboards)

    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO dashboards (nombre_dashboard, destacado, user_id) VALUES (%s, %s, %s)",
                           (data['nombre'], data['destacado'], data['user_id']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})

@dashboard_bp.route('/dashboard/<int:id>', methods=['GET', 'PUT', 'DELETE', 'POST'])
def manage_dashboard(id):
    connection = get_db_connection()
    
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM dashboards WHERE id_dashboard=%s", (id,))
            dashboard = cursor.fetchone()
        connection.close()
        if dashboard:
            return jsonify(dashboard)
        return jsonify({"error": "Dashboard not found"}), 404

    elif request.method == 'PUT':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("UPDATE dashboards SET nombre_dashboard=%s, descripcion=%s, destacado=%s WHERE id_dashboard=%s",
                           (data['nombre'], data['descripcion'], data['destacado'], id))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"})

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM dashboard_graficas WHERE dashboard_id=%s", (id,))
            cursor.execute("DELETE FROM dashboard_invitados WHERE dashboard_id=%s", (id,))
            
            cursor.execute("DELETE FROM dashboards WHERE id_dashboard=%s", (id,))
            connection.commit()
        connection.close()
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
        
        connection.close()
        return jsonify({"status": "success", "id": dashboard_id})

@dashboard_bp.route('/dashboard_user/<int:id>', methods=['GET','POST'])
def dashboard_user(id):
    connection = get_db_connection()
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
        
@dashboard_bp.route('/invite_user', methods=['POST'])
def invite_user():
    connection = get_db_connection()
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



@dashboard_bp.route('/info_dash_user/<int:id>', methods=['GET'])
def info_dash_user(id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.callproc("cp_dashboardInfoUser", (id,))
            dashboards = cursor.fetchall()
            return jsonify(dashboards)
    except pymysql.MySQLError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()
        

@dashboard_bp.route('/info_graficas_dash/<int:id>', methods=['GET'])
def info_graficas_dash(id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.callproc("cp_graficasInfoByDashboard", (id,))
            graficas = cursor.fetchall()
            return jsonify(graficas)
    except pymysql.MySQLError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()
@dashboard_bp.route('/info_graficas_dash_sensor_data/<int:id>', methods=['GET'])
def info_graficas_dash_sensor_data(id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.callproc("cp_getInfoDashboardDataSensorByDashboard", (id,))
            graficas = cursor.fetchall()
            return jsonify(graficas)
    except pymysql.MySQLError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()
        
        
@dashboard_bp.route('/dashboard_graficas', methods=['DELETE'])
def delete_dashboard_graficas():
    data = request.get_json()  # Get the JSON data from the request
    dashboard_id = data.get('dashboard_id')
    grafica_id = data.get('grafica_id')
    
    if not dashboard_id or not grafica_id:
        return jsonify({"status": "error", "message": "Missing dashboard_id or grafica_id"}), 400

    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "DELETE FROM dashboard_graficas WHERE dashboard_id=%s AND graficas_id=%s",
                (dashboard_id, grafica_id)
            )
            connection.commit()
    finally:
        connection.close()

    return jsonify({"status": "success"})