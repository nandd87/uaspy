# add.py
from flask import Blueprint, render_template, request, redirect, url_for, current_app
import os
from db import get_db

add_item_bp = Blueprint('add', __name__)

# # Function to save the uploaded image
# def save_image(file):
#     # Ensure the 'uploads' directory exists
#     upload_folder = 'uploads'
#     if not os.path.exists(upload_folder):
#         os.makedirs(upload_folder)
#     filename = os.path.join(upload_folder, os.path.basename(file.filename))
#     filename = os.path.join(upload_folder, file.filename)
#     filename = filename.replace('\\', '/')
#     file.save(filename)
#     print(filename)
#     return filename

def save_image(file):
    # Ensure the 'uploads' directory exists inside the 'static' folder
    upload_folder = os.path.join(current_app.static_folder, 'uploads')
    
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    # Get the filename without the path
    filename = os.path.join(upload_folder, os.path.basename(file.filename))
    file.save(filename)

    
    relative_path = os.path.relpath(filename, current_app.static_folder)
    relative_path = relative_path.replace('\\', '/')
    print(relative_path)
    return relative_path



@add_item_bp.route('/render_add')
def add_render():
    # Fetch items from the database
    connection,cursor = get_db()
    cursor.execute('SELECT * FROM item')
    items = cursor.fetchall()

    return render_template('additem.html', items=items)

@add_item_bp.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return redirect(request.url)

    file = request.files['file']

    if file.filename == '':
        return redirect(request.url)

    if file:
        filename = save_image(file)

        # Save the item details to the database
        connection,cursor = get_db()
        cursor.execute('INSERT INTO item (nama, deskripsi, harga, tipe, image) VALUES (%s, %s, %s, %s, %s)',
               (request.form['nama'], request.form['deskripsi'], int(request.form['harga']), request.form['jenis'], filename))

        connection.commit()

        return redirect(url_for('add.add_render'))
