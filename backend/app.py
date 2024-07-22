from flask import Flask
from config import Config
from routes.user_routes import user_bp
from routes.auth_routes import auth_bp
from routes.sensor_routes import sensor_bp
from routes.manage_dashboards import dashboard_bp
from routes.widgets_routes import widgets_bp
from routes.location_routes import location_bp
from routes.university_routes import university_bp

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(sensor_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(widgets_bp)
app.register_blueprint(location_bp)
app.register_blueprint(university_bp)

@app.route('/')
def home():
    return "Welcome!"

if __name__ == '__main__':
    app.run(host=Config.HOST, port=5000)
