# register.py
from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
from db import get_db
import secrets

register_bp = Blueprint('register', __name__)

# Configure Flask-Mail
mail = Mail()

def init_mail(app):
    mail.init_app(app)

# Function to generate a secure token
def generate_verification_token():
    return secrets.token_urlsafe(32)

def is_username_taken(username):
    db = get_db()

    with db.cursor() as cursor:
        sql = "SELECT * FROM akun WHERE username=%s"
        cursor.execute(sql, (username,))
        user = cursor.fetchone()

    return user is not None

def create_user(username, password, email, token):
    db = get_db()

    with db.cursor() as cursor:
        sql = "INSERT INTO akun (username, password, email, verification_token) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (username, password, email, token))

    db.commit()

def is_valid_verification_token(token):
    db = get_db()

    with db.cursor() as cursor:
        sql = "SELECT * FROM akun WHERE verification_token=%s AND is_verified=False"
        cursor.execute(sql, (token,))
        user = cursor.fetchone()

    return user is not None

@register_bp.route('/verify/<token>')
def verify(token):
    if not is_valid_verification_token(token):
        flash('Invalid verification token or account already verified.', 'error')
        return redirect(url_for('index'))

    db = get_db()

    with db.cursor() as cursor:
        # Update the user's status to 'verified'
        sql = "UPDATE akun SET is_verified=True, verification_token=NULL WHERE verification_token=%s"
        cursor.execute(sql, (token,))

    db.commit()

    flash('Account verified successfully! You can now log in.')
    return redirect(url_for('login.login_render'))

@register_bp.route('/register', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        print("point1")

        if not username or not password or not email:
            print("point2")
            flash('Username, password, and email are required.', 'error')

        elif is_username_taken(username):
            print("point3")
            flash('Username is already taken.', 'error')
        else:
            print("point4")
            token = generate_verification_token()
            print("point5")
            create_user(username, password, email, token)
            print("point6")
            send_verification_email(email, token)
            flash('Registration successful. Please check your email for verification.', 'success')
            return redirect(url_for('login.login_render'))

    # Add a default return statement for other cases
    return render_template('register.html')

def send_verification_email(email, token):
    subject = 'Account Verification'

    # You can create an HTML template for the email body
    body = f"Click the following link to verify your account: {url_for('register.verify', token=token, _external=True)}"

    message = Message(subject=subject, recipients=[email], body=body)

    try:
        mail.send(message)
        print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")



# In your main app file (app.py), make sure to initialize Flask-Mail:
# ...
# from register import init_mail
# ...

# After creating the Flask app instance (app), initialize Flask-Mail:
# init_mail(app)
