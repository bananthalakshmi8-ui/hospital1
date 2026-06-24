from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from models import db
from models.lab_test import LabTest, LabTestBooking
from services.auth_service import get_current_user_id, role_required

lab_tests_bp = Blueprint('lab_tests', __name__, url_prefix='/api/lab-tests')


@lab_tests_bp.route('', methods=['GET'])
def get_lab_tests():
    popular_only = request.args.get('popular', '').lower() == 'true'
    query = LabTest.query
    if popular_only:
        query = query.filter_by(popular=True)
    tests = query.all()
    return jsonify({
        'success': True,
        'lab_tests': [t.to_dict() for t in tests],
        'count': len(tests),
    })


@lab_tests_bp.route('/<int:test_id>', methods=['GET'])
def get_lab_test(test_id):
    test = LabTest.query.get(test_id)
    if not test:
        return jsonify({'success': False, 'message': 'Lab test not found'}), 404
    return jsonify({'success': True, 'lab_test': test.to_dict()})


@lab_tests_bp.route('/book', methods=['POST'])
@jwt_required()
@role_required('patient', 'admin')
def book_lab_test():
    data = request.get_json() or {}
    lab_test_id = data.get('lab_test_id')
    booking_date = data.get('date') or data.get('booking_date')

    if not lab_test_id or not booking_date:
        return jsonify({'success': False, 'message': 'lab_test_id and date are required'}), 400

    test = LabTest.query.get(int(lab_test_id))
    if not test:
        return jsonify({'success': False, 'message': 'Lab test not found'}), 404

    booking = LabTestBooking(
        user_id=get_current_user_id(),
        lab_test_id=test.id,
        booking_date=booking_date,
        status='pending',
    )
    db.session.add(booking)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Lab test booked successfully',
        'booking': booking.to_dict(),
    }), 201


@lab_tests_bp.route('/bookings', methods=['GET'])
@jwt_required()
@role_required('patient', 'admin')
def my_bookings():
    bookings = LabTestBooking.query.filter_by(user_id=get_current_user_id()).order_by(LabTestBooking.created_at.desc()).all()
    return jsonify({
        'success': True,
        'bookings': [b.to_dict() for b in bookings],
        'count': len(bookings),
    })
