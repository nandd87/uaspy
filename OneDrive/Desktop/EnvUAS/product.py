# add.py
import os
from db import get_db, get_item_by_id
from flask import request, Blueprint, Flask, render_template, url_for, session, redirect
from flask_mail import Mail, Message

product = Blueprint('product', __name__)
# add.py

mail = Mail()

@product.route('/add_to_cart/<int:item_id>', methods=['GET', 'POST'])
def add_to_cart(item_id):
    
    session.modified = True
    item = get_item_by_id(item_id)

    if item is not None:
        # Check if 'cart' is already in the session
        if 'cart' not in session:
            session['cart'] = []

        # Append the new item to the existing cart
        session['cart'].append({
            'id': item['id'],
            'nama': item['nama'],
            'harga': item['harga']
        })

        print("Cart after addition:", session['cart'])

        return redirect(url_for('index'))
    else:
        return render_template('err.html')  # You can customize this template


@product.route('/view_cart', methods=['GET', 'POST'])
def view_cart():
    session.modified = True
    if request.method == 'POST':
        session.pop('cart', None)

        return render_template('order_confirmation.html')
    cart_items = session.get('cart', [])
    total_harga = sum(item['harga'] for item in cart_items)

    return render_template('cart.html', cart_items=cart_items, total_harga=total_harga)


@product.route('/clear', methods=['GET', 'POST'])
def clear():
    session.pop('cart', None)
    return redirect(url_for('index', cart_cleared=True))


@product.route('/view_detail/<int:item_id>')
def view_detail(item_id):
    item = get_item_by_id(item_id)

    if item is not None:
        return render_template('viewdetail.html', item=item)
    else:
        return render_template('err.html')  # You can customize this template
    


@product.route('/search', methods=['GET'])
def perform_search():
    search_term = request.args.get('query')

    connection, cursor = get_db()

    query = f"SELECT * FROM item WHERE nama LIKE '%{search_term}%'"

    cursor.execute(query)
    results = cursor.fetchall()  # Fetch all results
    print("Result: " , results)

    return render_template('search_results.html', results=results)

# Inside your product Blueprint
@product.route('/remove_from_cart/<int:item_id>', methods=['POST'])
def remove_from_cart(item_id):
    session.modified = True
    if 'cart' in session:
        session['cart'] = [item for item in session['cart'] if item['id'] != item_id]
    
    return redirect(url_for('product.view_cart'))


# Inside your product Blueprint
@product.route('/products/<product_type>')
def product_page(product_type):
    # Fetch products based on type from the database (update this based on your model)
    products = get_products_by_type(product_type)  # Implement a function like this in your code

    return render_template('product_page.html', products=products, product_type=product_type)


def get_products_by_type(product_type):
    connection, cursor = get_db()
    cursor.execute('SELECT * FROM item WHERE tipe = %s', (product_type,))
    products = cursor.fetchall()
    cursor.close()

    # Return the products or an empty list if not found
    return products

@product.route('/keluhan', methods=['GET', 'POST'])
def send_email():
    if request.method == 'POST':
        # Get form data
        email = request.form['email']
        username = request.form['username']
        desc = request.form['desc']

        # Prepare email content
        subject = 'Keluhan'
        body = f"Dari: {email}\nUsername: {username}\nKeluhannya: {desc}"

        # Create and send the email
        message = Message(subject=subject, recipients=[email], body=body)
        try:
            mail.send(message)
            print("Email sent successfully")
        except Exception as e:
            print(f"Failed to send email: {e}")

    # Render the contact form
    return render_template('contactus.html')

@product.route('/keluhan_render')
def keluhan_render():
     return render_template('contactus.html')

@product.route('/payment')
def payment_render():
     return render_template('payment.html')
