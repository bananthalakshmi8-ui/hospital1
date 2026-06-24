import os
import uuid

from flask import Blueprint, current_app, jsonify, request, send_from_directory
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename

from models import db
from models.prescription import Prescription
from services.auth_service import get_current_user_id, role_required

prescriptions_bp = Blueprint('prescriptions', __name__, url_prefix='/api/prescriptions')


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']


@prescriptions_bp.route('/upload', methods=['POST'])
@jwt_required()
@role_required('patient', 'admin')
def upload_prescription():
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file provided'}), 400

    file = request.files['file']
    if not file or file.filename == '':
        return jsonify({'success': False, 'message': 'No file selected'}), 400

    if not allowed_file(file.filename):
        return jsonify({'success': False, 'message': 'Allowed formats: JPG, PNG, PDF'}), 400

    ext = file.filename.rsplit('.', 1)[1].lower()
    filename = f"{uuid.uuid4().hex}.{ext}"
    upload_folder = current_app.config['UPLOAD_FOLDER']
    os.makedirs(upload_folder, exist_ok=True)
    filepath = os.path.join(upload_folder, filename)
    file.save(filepath)

    prescription = Prescription(
        user_id=get_current_user_id(),
        file_path=filepath,
        original_filename=secure_filename(file.filename),
        status='pending',
    )
    db.session.add(prescription)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Prescription uploaded successfully',
        'prescription': prescription.to_dict(),
    }), 201


@prescriptions_bp.route('', methods=['GET'])
@jwt_required()
@role_required('patient', 'admin', 'doctor')
def list_prescriptions():
    prescriptions = Prescription.query.filter_by(user_id=get_current_user_id()).order_by(Prescription.upload_date.desc()).all()
    return jsonify({
        'success': True,
        'prescriptions': [p.to_dict() for p in prescriptions],
        'count': len(prescriptions),
    })


@prescriptions_bp.route('/files/<int:prescription_id>', methods=['GET'])
@jwt_required()
@role_required('patient', 'admin', 'doctor')
def get_prescription_file(prescription_id):
    prescription = Prescription.query.get(prescription_id)
    if not prescription:
        return jsonify({'success': False, 'message': 'Prescription not found'}), 404
    if prescription.user_id != get_current_user_id():
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403

    directory = os.path.dirname(prescription.file_path)
    filename = os.path.basename(prescription.file_path)
    return send_from_directory(directory, filename)
