from flask import Flask , render_template ,request
from grabuser import grabuser_bp
from auth import login_bp 
from register import register_bp
from add import add_item_bp
from product import product
from db import init_app, get_db
from flask_mail import Mail
from register import init_mail

app = Flask(__name__)
app.config['SECRET_KEY'] = 'gatauiniapaanpokoknyabuathash'  # SaltRound biatchhh
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'uaspy'
app.config['UPLOAD_FOLDER'] = 'uploads/'


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587 
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'bernando8787@gmail.com'
app.config['MAIL_PASSWORD'] = 'amhk kmwu vmnz fkon'
app.config['MAIL_DEFAULT_SENDER'] = 'bernando8787@gmail.com'

mail = Mail(app)

app.register_blueprint(grabuser_bp)
app.register_blueprint(login_bp)
app.register_blueprint(register_bp)
app.register_blueprint(add_item_bp)
app.register_blueprint(product)

init_app(app)

@app.route("/")
def index():
    cart_cleared = request.args.get('cart_cleared', False)
    connection, cursor = get_db()
    cursor.execute('SELECT * FROM item')
    items = cursor.fetchall()
    cursor.close()

    return render_template('index.html', items=items, cart_cleared=cart_cleared)

if __name__ == '__main__':
    app.run(debug=True)
