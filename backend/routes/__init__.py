from flask import Blueprint
from .user_routes import user_bp
from .auth_routes import auth_bp
from .sensor_routes import sensor_bp
from .manage_dashboards import dashboard_bp

def register_blueprints(app):
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(sensor_bp)
    app.register_blueprint(dashboard_bp)
