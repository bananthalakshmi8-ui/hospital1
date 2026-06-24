import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import config_by_name
from models import db
import models.user  # noqa: F401
import models.doctor  # noqa: F401
import models.appointment  # noqa: F401
import models.medicine  # noqa: F401
import models.order  # noqa: F401
import models.lab_test  # noqa: F401
import models.prescription  # noqa: F401
import models.cart  # noqa: F401
from routes.admin import admin_bp
from routes.appointments import appointments_bp
from routes.auth import auth_bp
from routes.cart import cart_bp
from routes.doctors import doctors_bp
from routes.lab_tests import lab_tests_bp
from routes.medicines import medicines_bp
from routes.orders import orders_bp
from routes.prescriptions import prescriptions_bp
from services.seed_data import ensure_upload_dirs, seed_database

load_dotenv()


def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')

    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    CORS(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)

    db.init_app(app)
    JWTManager(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(doctors_bp)
    app.register_blueprint(appointments_bp)
    app.register_blueprint(medicines_bp)
    app.register_blueprint(cart_bp)
    app.register_blueprint(orders_bp)
    app.register_blueprint(lab_tests_bp)
    app.register_blueprint(prescriptions_bp)
    app.register_blueprint(admin_bp)

    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({'success': True, 'message': 'MediCare Plus API is running', 'status': 'healthy'})

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'success': False, 'message': 'Resource not found'}), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({'success': False, 'message': 'Method not allowed'}), 405

    @app.errorhandler(413)
    def file_too_large(error):
        return jsonify({'success': False, 'message': 'File too large. Max 10MB'}), 413

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

    with app.app_context():
        os.makedirs(os.path.join(app.root_path, 'database'), exist_ok=True)
        ensure_upload_dirs(app.config['UPLOAD_FOLDER'])
        db.create_all()
        seed_database()

    return app


app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)
