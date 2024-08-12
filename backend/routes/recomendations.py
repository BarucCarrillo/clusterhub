from flask import Blueprint, request, jsonify
from database import get_db_connection
import pymysql


recomendations_bp = Blueprint('recomendations', __name__)

@recomendations_bp.route('/recomendations', methods=['GET', 'POST'])
def manage_recomendations():
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM recomendaciones")
            recomendations = cursor.fetchall()
        connection.close()
        return jsonify(recomendations), 200
    
    elif request.method == 'POST':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO recomendaciones (titulo, descripcion,url1,url2,url3 ,user_id,recomendacion1,recomendacion2,recomendacion3) VALUES (%s, %s, %s, %s, %s, %s ,%s, %s, %s)",
                           (data['titulo'],data['descripcion'],data['url1'],data['url2'],data['url3'], data['user_id'],data['recomendacion1'],data['recomendacion2'],data['recomendacion3']))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"}), 200
    
    
@recomendations_bp.route('/recomendations/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def manage_recomendation(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM recomendaciones WHERE user_id =%s ORDER BY id_recomendaciones  DESC LIMIT 1;", (id,))
            recomendation = cursor.fetchone()
        connection.close()
        if recomendation:
            return jsonify(recomendation)
        return jsonify({"error": "Recomendation not found"}), 404

    elif request.method == 'PATCH':
        data = request.get_json()
        with connection.cursor() as cursor:
            cursor.execute("UPDATE recomendaciones SET recomendacion=%s WHERE id_recomendacion=%s",
                           (data['recomendacion'], id))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"}), 200

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM recomendaciones WHERE id_recomendacion=%s", (id,))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"}) ,200
    elif request.method == 'POST':
        data = request.get_json()
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO recomendaciones ( titulo, Descripcion, url1, url2, url3, user_id,recomendacion1,recomendacion2,recomendacion3) "
                    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (data['titulo'],data['descripcion'],data['url1'],data['url2'],data['url3'], data['user_id'],data['recomendacion1'],data['recomendacion2'],data['recomendacion3'])
                )
                connection.commit()
            return jsonify({"status": "success"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
        finally:
            connection.close()