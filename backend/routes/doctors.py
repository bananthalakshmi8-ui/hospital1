from flask import Blueprint, jsonify, request
from sqlalchemy import or_

from models import db
from models.doctor import Doctor

doctors_bp = Blueprint('doctors', __name__, url_prefix='/api/doctors')


@doctors_bp.route('', methods=['GET'])
def get_doctors():
    department = request.args.get('department')
    availability = request.args.get('availability')
    search = request.args.get('search', '').strip().lower()

    query = Doctor.query
    if department and department != 'all':
        query = query.filter_by(department=department)
    if availability and availability != 'all':
        query = query.filter_by(availability=availability)
    if search:
        query = query.filter(
            or_(
                Doctor.name.ilike(f'%{search}%'),
                Doctor.specialization.ilike(f'%{search}%'),
            )
        )

    doctors = query.all()
    return jsonify({'success': True, 'doctors': [d.to_dict() for d in doctors], 'count': len(doctors)})


@doctors_bp.route('/<int:doctor_id>', methods=['GET'])
def get_doctor(doctor_id):
    doctor = Doctor.query.get(doctor_id)
    if not doctor:
        return jsonify({'success': False, 'message': 'Doctor not found'}), 404
    return jsonify({'success': True, 'doctor': doctor.to_dict()})
