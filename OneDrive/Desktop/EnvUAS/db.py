import pymysql
from flask import current_app, g
from flask.cli import with_appcontext

def get_db():
    if 'db' not in g:
        g.db = pymysql.connect(
            host=current_app.config['MYSQL_HOST'],
            user=current_app.config['MYSQL_USER'],
            password=current_app.config['MYSQL_PASSWORD'],
            database=current_app.config['MYSQL_DB'],
            cursorclass=pymysql.cursors.DictCursor
        )
    return g.db, g.db.cursor()

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_app(app):
    app.teardown_appcontext(close_db)

def init_db():
    # table add manual JGN MAGER

    # 07/01/2024 gajadi deh mager KWKWK yg pnting route masuk kan
    pass

def get_item_by_id(item_id):
    connection, cursor = get_db()
    cursor.execute('SELECT * FROM item WHERE id = %s', (item_id,))
    item = cursor.fetchone()
    cursor.close()

    return item

#init db biar masuk ke route main
def init_db_command():
    init_db()
    print('Initialized the database.')
