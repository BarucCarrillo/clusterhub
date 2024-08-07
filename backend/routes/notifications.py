from flask import Blueprint, request, jsonify
from database import get_db_connection
import pymysql


notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/notifications', methods=['GET'])
def get_notifications():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM notificaciones")
        notifications = cursor.fetchall()
    connection.close()
    return jsonify(notifications), 200



@notification_bp.route('/notifications/<int:id>', methods=['GET', 'DELETE'])
def manage_notification(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM notificaciones WHERE user_id=%s ORDER BY fecha DESC LIMIT 15", (id,))
            notification = cursor.fetchall()
        connection.close()
        if notification:
            return jsonify(notification)
        return jsonify({"error": "Notification not found"}), 404

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM notificaciones WHERE id_notificacion=%s", (id,))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"}), 200
    
    
    
    
@notification_bp.route('/notifications_one/<int:id>', methods=['GET', 'DELETE'])
def manage_notification_one(id):
    connection = get_db_connection()
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM notificaciones WHERE user_id=%s ORDER BY fecha DESC LIMIT 1", (id,))
            notification = cursor.fetchall()
        connection.close()
        if notification:
            return jsonify(notification)
        return jsonify({"error": "Notification not found"}), 404

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM notificaciones WHERE id_notificacion=%s", (id,))
            connection.commit()
        connection.close()
        return jsonify({"status": "success"}), 200






