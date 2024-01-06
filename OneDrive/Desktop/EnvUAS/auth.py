# auth.py
from flask import Blueprint, render_template, request, redirect, url_for,session
from db import get_db

login_bp = Blueprint('login', __name__)

@login_bp.route('/login_render')
def login_render():
    return render_template('login.html')


@login_bp.route('/login', methods=['GET', 'POST'])

def login():
    error_message = None
    if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']

            if is_valid_user(username, password):
                # Store user information in the session
                session['user_logged_in'] = username
                return redirect(url_for('index'))
            else:
                error_message = 'Invalid username or password or the account isn\'t verified. Please try again.'

    return render_template('login.html', error_message=error_message)

def is_valid_user(username, password):
    db = get_db()

    connection,cursor = get_db()
    sql = "SELECT * FROM akun WHERE username=%s AND password=%s"
    cursor.execute(sql, (username, password))
    user = cursor.fetchone()

    return user is not None and user['is_verified']


@login_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))