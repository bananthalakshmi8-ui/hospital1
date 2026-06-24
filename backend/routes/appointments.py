from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from models import db
from models.appointment import Appointment
from models.doctor import Doctor
from models.user import User
from services.auth_service import get_current_user_id, role_required

appointments_bp = Blueprint('appointments', __name__, url_prefix='/api/appointments')


@appointments_bp.route('', methods=['GET'])
@jwt_required()
@role_required('patient', 'doctor', 'admin')
def list_appointments():
    user = User.query.get(get_current_user_id())
    if user.role == 'patient':
        appointments = Appointment.query.filter_by(patient_id=user.id).order_by(Appointment.created_at.desc()).all()
    elif user.role == 'doctor':
        doctor = Doctor.query.filter_by(user_id=user.id).first()
        if not doctor:
            return jsonify({'success': True, 'appointments': [], 'count': 0})
        appointments = Appointment.query.filter_by(doctor_id=doctor.id).order_by(Appointment.created_at.desc()).all()
    else:
        appointments = Appointment.query.order_by(Appointment.created_at.desc()).all()

    return jsonify({
        'success': True,
        'appointments': [a.to_dict() for a in appointments],
        'count': len(appointments),
    })


@appointments_bp.route('/book', methods=['POST'])
@jwt_required()
@role_required('patient')
def book_appointment():
    data = request.get_json() or {}
    doctor_id = data.get('doctor_id') or data.get('doctor')
    date = data.get('date', '').strip()
    time = data.get('time', '').strip()
    symptoms = data.get('symptoms', '').strip()

    if not doctor_id or not date or not time:
        return jsonify({'success': False, 'message': 'Doctor, date, and time are required'}), 400

    doctor = Doctor.query.get(int(doctor_id))
    if not doctor:
        return jsonify({'success': False, 'message': 'Doctor not found'}), 404

    appointment = Appointment(
        patient_id=get_current_user_id(),
        doctor_id=doctor.id,
        date=date,
        time=time,
        symptoms=symptoms,
        status='pending',
    )
    db.session.add(appointment)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Appointment booked successfully',
        'appointment': appointment.to_dict(),
    }), 201


@appointments_bp.route('/<int:appointment_id>/cancel', methods=['PUT'])
@jwt_required()
@role_required('patient')
def cancel_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        return jsonify({'success': False, 'message': 'Appointment not found'}), 404
    if appointment.patient_id != get_current_user_id():
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    if appointment.status in ('completed', 'cancelled'):
        return jsonify({'success': False, 'message': f'Cannot cancel {appointment.status} appointment'}), 400

    appointment.status = 'cancelled'
    db.session.commit()
    return jsonify({'success': True, 'message': 'Appointment cancelled', 'appointment': appointment.to_dict()})


@appointments_bp.route('/<int:appointment_id>/approve', methods=['PUT'])
@jwt_required()
@role_required('doctor', 'admin')
def approve_appointment(appointment_id):
    appointment = _get_doctor_appointment(appointment_id)
    if isinstance(appointment, tuple):
        return appointment
    appointment.status = 'approved'
    db.session.commit()
    return jsonify({'success': True, 'message': 'Appointment approved', 'appointment': appointment.to_dict()})


@appointments_bp.route('/<int:appointment_id>/reject', methods=['PUT'])
@jwt_required()
@role_required('doctor', 'admin')
def reject_appointment(appointment_id):
    appointment = _get_doctor_appointment(appointment_id)
    if isinstance(appointment, tuple):
        return appointment
    appointment.status = 'rejected'
    db.session.commit()
    return jsonify({'success': True, 'message': 'Appointment rejected', 'appointment': appointment.to_dict()})


@appointments_bp.route('/<int:appointment_id>/complete', methods=['PUT'])
@jwt_required()
@role_required('doctor', 'admin')
def complete_appointment(appointment_id):
    appointment = _get_doctor_appointment(appointment_id)
    if isinstance(appointment, tuple):
        return appointment
    appointment.status = 'completed'
    db.session.commit()
    return jsonify({'success': True, 'message': 'Appointment completed', 'appointment': appointment.to_dict()})


def _get_doctor_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        return jsonify({'success': False, 'message': 'Appointment not found'}), 404

    user = User.query.get(get_current_user_id())
    if user.role == 'doctor':
        doctor = Doctor.query.filter_by(user_id=user.id).first()
        if not doctor or appointment.doctor_id != doctor.id:
            return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    return appointment
