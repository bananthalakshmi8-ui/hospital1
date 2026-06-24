import json

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from sqlalchemy import func

from models import db
from models.appointment import Appointment
from models.doctor import Doctor
from models.medicine import Medicine
from models.order import Order
from models.user import User
from services.auth_service import role_required

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')


@admin_bp.route('/users', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_users():
    users = User.query.order_by(User.created_at.desc()).all()
    return jsonify({'success': True, 'users': [u.to_dict() for u in users], 'count': len(users)})


@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    if user.role == 'admin':
        return jsonify({'success': False, 'message': 'Cannot delete admin user'}), 400
    db.session.delete(user)
    db.session.commit()
    return jsonify({'success': True, 'message': 'User deleted'})


@admin_bp.route('/doctors', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify({'success': True, 'doctors': [d.to_dict() for d in doctors], 'count': len(doctors)})


@admin_bp.route('/doctors', methods=['POST'])
@jwt_required()
@role_required('admin')
def create_doctor():
    data = request.get_json() or {}
    required = ['name', 'specialization', 'consultation_fee']
    if not all(data.get(f) for f in required):
        return jsonify({'success': False, 'message': 'name, specialization, consultation_fee required'}), 400

    doctor = Doctor(
        name=data['name'],
        specialization=data['specialization'],
        department=data.get('department', ''),
        experience=data.get('experience', 0),
        consultation_fee=float(data['consultation_fee']),
        availability=data.get('availability', 'available'),
        rating=data.get('rating', 4.5),
        reviews=data.get('reviews', 0),
        image=data.get('image', ''),
        education=data.get('education', ''),
        languages=','.join(data.get('languages', [])) if isinstance(data.get('languages'), list) else data.get('languages', ''),
        about=data.get('about', ''),
    )
    db.session.add(doctor)
    db.session.commit()
    return jsonify({'success': True, 'doctor': doctor.to_dict()}), 201


@admin_bp.route('/doctors/<int:doctor_id>', methods=['PUT'])
@jwt_required()
@role_required('admin')
def update_doctor(doctor_id):
    doctor = Doctor.query.get(doctor_id)
    if not doctor:
        return jsonify({'success': False, 'message': 'Doctor not found'}), 404

    data = request.get_json() or {}
    for field in ['name', 'specialization', 'department', 'experience', 'availability', 'rating', 'reviews', 'image', 'education', 'about']:
        if field in data:
            setattr(doctor, field, data[field])
    if 'consultation_fee' in data:
        doctor.consultation_fee = float(data['consultation_fee'])
    if 'languages' in data:
        doctor.languages = ','.join(data['languages']) if isinstance(data['languages'], list) else data['languages']

    db.session.commit()
    return jsonify({'success': True, 'doctor': doctor.to_dict()})


@admin_bp.route('/doctors/<int:doctor_id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def delete_doctor(doctor_id):
    doctor = Doctor.query.get(doctor_id)
    if not doctor:
        return jsonify({'success': False, 'message': 'Doctor not found'}), 404
    db.session.delete(doctor)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Doctor deleted'})


@admin_bp.route('/medicines', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_medicines():
    medicines = Medicine.query.all()
    return jsonify({'success': True, 'medicines': [m.to_dict() for m in medicines], 'count': len(medicines)})


@admin_bp.route('/medicines', methods=['POST'])
@jwt_required()
@role_required('admin')
def create_medicine():
    data = request.get_json() or {}
    if not data.get('name') or not data.get('price'):
        return jsonify({'success': False, 'message': 'name and price are required'}), 400

    benefits = data.get('benefits', [])
    medicine = Medicine(
        name=data['name'],
        category=data.get('category', 'medicines'),
        description=data.get('description', ''),
        price=float(data['price']),
        original_price=float(data.get('original_price', data['price'])),
        discount=int(data.get('discount', 0)),
        stock=int(data.get('stock', 0)),
        image=data.get('image', ''),
        rating=float(data.get('rating', 4.5)),
        reviews=int(data.get('reviews', 0)),
        ingredients=data.get('ingredients', ''),
        usage=data.get('usage', ''),
        benefits=json.dumps(benefits) if isinstance(benefits, list) else benefits,
        bestseller=bool(data.get('bestseller', False)),
    )
    db.session.add(medicine)
    db.session.commit()
    return jsonify({'success': True, 'medicine': medicine.to_dict()}), 201


@admin_bp.route('/medicines/<int:medicine_id>', methods=['PUT'])
@jwt_required()
@role_required('admin')
def update_medicine(medicine_id):
    medicine = Medicine.query.get(medicine_id)
    if not medicine:
        return jsonify({'success': False, 'message': 'Medicine not found'}), 404

    data = request.get_json() or {}
    for field in ['name', 'category', 'description', 'image', 'ingredients', 'usage', 'bestseller']:
        if field in data:
            setattr(medicine, field, data[field])
    for field in ['price', 'original_price', 'rating']:
        if field in data:
            setattr(medicine, field, float(data[field]))
    for field in ['discount', 'stock', 'reviews']:
        if field in data:
            setattr(medicine, field, int(data[field]))
    if 'benefits' in data:
        benefits = data['benefits']
        medicine.benefits = json.dumps(benefits) if isinstance(benefits, list) else benefits

    db.session.commit()
    return jsonify({'success': True, 'medicine': medicine.to_dict()})


@admin_bp.route('/medicines/<int:medicine_id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def delete_medicine(medicine_id):
    medicine = Medicine.query.get(medicine_id)
    if not medicine:
        return jsonify({'success': False, 'message': 'Medicine not found'}), 404
    db.session.delete(medicine)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Medicine deleted'})


@admin_bp.route('/orders', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify({'success': True, 'orders': [o.to_dict() for o in orders], 'count': len(orders)})


@admin_bp.route('/appointments', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_appointments():
    appointments = Appointment.query.order_by(Appointment.created_at.desc()).all()
    return jsonify({'success': True, 'appointments': [a.to_dict() for a in appointments], 'count': len(appointments)})


@admin_bp.route('/reports', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_reports():
    return jsonify({
        'success': True,
        'reports': {
            'total_users': User.query.count(),
            'total_patients': User.query.filter_by(role='patient').count(),
            'total_doctors': Doctor.query.count(),
            'total_medicines': Medicine.query.count(),
            'total_orders': Order.query.count(),
            'total_appointments': Appointment.query.count(),
            'pending_appointments': Appointment.query.filter_by(status='pending').count(),
            'revenue': db.session.query(func.sum(Order.total_amount)).scalar() or 0,
            'low_stock_medicines': Medicine.query.filter(Medicine.stock < 20).count(),
        },
    })
