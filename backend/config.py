from dotenv import load_dotenv
import os

# Carga las variables del archivo .env
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_NAME = os.getenv('DB_NAME', 'cluster_hub')
    DB_CHARSET = os.getenv('DB_CHARSET', 'utf8mb4')
    HOST = os.getenv('HOST', '192.168.100.40')
