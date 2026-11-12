import os
import re
from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
import psycopg2
from flask import Flask, jsonify, request
from flask_cors import CORS
from psycopg2 import DatabaseError, errors
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-change-me')

ROLES = ('student', 'teacher')
EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
TOKEN_TTL = timedelta(days=7)


def get_db_connection():
    return psycopg2.connect(
        dbname=os.environ.get('DB_NAME', 'circuits_lab'),
        user=os.environ.get('DB_USER', 'admin'),
        password=os.environ.get('DB_PASSWORD', 'SvT47_!s'),
        host=os.environ.get('DB_HOST', 'localhost'),
    )


def make_token(user_id, role):
    now = datetime.now(timezone.utc)
    return jwt.encode(
        {'sub': str(user_id), 'role': role, 'iat': now, 'exp': now + TOKEN_TTL},
        app.config['SECRET_KEY'],
        algorithm='HS256',
    )


def auth_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        header = request.headers.get('Authorization', '')
        if not header.startswith('Bearer '):
            return jsonify({'error': 'Требуется авторизация'}), 401
        try:
            payload = jwt.decode(header[7:], app.config['SECRET_KEY'], algorithms=['HS256'])
            request.user_id = int(payload['sub'])
        except (jwt.InvalidTokenError, KeyError, ValueError):
            return jsonify({'error': 'Недействительный или просроченный токен'}), 401
        return f(*args, **kwargs)
    return wrapper


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json(silent=True) or {}
    first_name = str(data.get('first_name', '')).strip()
    last_name = str(data.get('last_name', '')).strip()
    email = str(data.get('email', '')).strip().lower()
    password = str(data.get('password', ''))
    role = data.get('role')

    if not first_name or not last_name:
        return jsonify({'error': 'Укажите имя и фамилию'}), 400
    if not EMAIL_RE.match(email):
        return jsonify({'error': 'Некорректная эл. почта'}), 400
    if len(password) < 8:
        return jsonify({'error': 'Пароль должен быть не меньше 8 символов'}), 400
    if role not in ROLES:
        return jsonify({'error': 'Роль должна быть student или teacher'}), 400

    conn = cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT 1 FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            return jsonify({'error': 'Пользователь с такой почтой уже существует'}), 409

        cur.execute(
            """INSERT INTO users (first_name, last_name, email, password, role)
               VALUES (%s, %s, %s, %s, %s)
               RETURNING id""",
            (first_name, last_name, email, generate_password_hash(password), role),
        )
        user_id = cur.fetchone()[0]
        user = {'id': user_id, 'first_name': first_name, 'last_name': last_name,
                'email': email, 'role': role}
        conn.commit()
        return jsonify({'token': make_token(user['id'], role), 'user': user}), 201

    except errors.UniqueViolation:
        conn.rollback()
        return jsonify({'error': 'Пользователь с такой почтой уже существует'}), 409
    except DatabaseError as e:
        if conn:
            conn.rollback()
        return jsonify({'error': 'Ошибка базы данных: ' + str(e)}), 500
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    email = str(data.get('email', '')).strip().lower()
    password = str(data.get('password', ''))

    if not email or not password:
        return jsonify({'error': 'Введите почту и пароль'}), 400

    conn = cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, first_name, last_name, email, role, password FROM users WHERE email = %s",
            (email,),
        )
        row = cur.fetchone()
        if not row or not check_password_hash(row[5], password):
            return jsonify({'error': 'Неверная почта или пароль'}), 401

        user = {'id': row[0], 'first_name': row[1], 'last_name': row[2],
                'email': row[3], 'role': row[4]}
        return jsonify({'token': make_token(user['id'], user['role']), 'user': user}), 200

    except DatabaseError as e:
        return jsonify({'error': 'Ошибка базы данных: ' + str(e)}), 500
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()




@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1")
        cur.close()
        conn.close()
        return jsonify({'status': 'healthy'}), 200
    except Exception as e:
        return jsonify({'status': 'unhealthy', 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
