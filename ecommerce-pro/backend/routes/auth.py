from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

# Base de datos simulada de usuarios con roles profesionales
USERS_DB = {
    "cliente@proshop.com": {"password": "123", "role": "client", "name": "Lucas"},
    "admin@proshop.com": {"password": "admin", "role": "admin", "name": "Lucas Admin"}
}

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    
    user = USERS_DB.get(email)
    
    if user and user["password"] == password:
        # Devolvemos un payload complejo listo para producción
        return jsonify({
            "message": "Autenticación exitosa",
            "token": f"fake-jwt-token-for-{user['role']}",
            "user": {
                "name": user["name"],
                "email": email,
                "role": user["role"]
            }
        }), 200
        
    return jsonify({"error": "Credenciales inválidas. Intenta cliente@proshop.com (123) o admin@proshop.com (admin)"}), 401