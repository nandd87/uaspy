from flask import Blueprint, render_template
from db import get_db

grabuser_bp = Blueprint('grabuser_bp', __name__)

@grabuser_bp.route('/grab')
def grab():
    with get_db().cursor() as cursor:
        sql = "SELECT * FROM `akun`"
        cursor.execute(sql)
        result = cursor.fetchall()
        print(result)
    return result