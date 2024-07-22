import jwt
import datetime
from config import Config

def encode_token(payload):
    payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(days=1)
    return jwt.encode(payload, Config.SECRET_KEY, algorithm='HS256')

def decode_jwt(token):
    try:
        return jwt.decode(token, Config.SECRET_KEY, algorithms='HS256')
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
