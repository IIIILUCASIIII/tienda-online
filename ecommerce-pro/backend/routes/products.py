from flask import Blueprint, jsonify

products_bp = Blueprint('products', __name__)

# Simulación de Base de Datos para simplificar el arranque, lista para conectar con SQLAlchemy
PRODUCTS = [
    {"id": 1, "name": "Teclado Mecánico Premium", "price": 120.00, "image": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500"},
    {"id": 2, "name": "Ratón Ergonómico Wireless", "price": 85.50, "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500"},
    {"id": 3, "name": "Monitor Gaming 4K", "price": 450.00, "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"}
]

@products_bp.route('/', methods=['GET'])
def get_products():
    return jsonify(PRODUCTS), 200

@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if product:
        return jsonify(product), 200
    return jsonify({"error": "Producto no encontrado"}), 404