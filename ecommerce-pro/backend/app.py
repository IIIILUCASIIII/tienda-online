from flask import Flask
from flask_cors import CORS
from config import Config
from routes.products import products_bp
from routes.auth import auth_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Habilitar CORS para conectar con el Frontend en React
    CORS(app)
    
    # Registro de Blueprints (Arquitectura modular profesional)
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)