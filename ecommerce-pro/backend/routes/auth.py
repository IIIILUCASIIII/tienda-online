from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Simulación de validación (Complejo: listo para integrar JWT)
    if username == "admin" and password == "admin":
        return jsonify({"message": "Login exitoso", "token": "fake-jwt-token", "user": username}), 200
    return jsonify({"error": "Credenciales inválidas"}), 401