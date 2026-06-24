from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from models import db
from models.cart import CartItem
from models.medicine import Medicine
from services.auth_service import get_current_user_id, role_required

cart_bp = Blueprint('cart', __name__, url_prefix='/api/cart')


@cart_bp.route('', methods=['GET'])
@jwt_required()
@role_required('patient', 'admin')
def get_cart():
    items = CartItem.query.filter_by(user_id=get_current_user_id()).all()
    total = sum((item.medicine.price if item.medicine else 0) * item.quantity for item in items)
    count = sum(item.quantity for item in items)
    return jsonify({
        'success': True,
        'cart': [item.to_dict() for item in items],
        'cartTotal': total,
        'cartCount': count,
    })


@cart_bp.route('/add', methods=['POST'])
@jwt_required()
@role_required('patient', 'admin')
def add_to_cart():
    data = request.get_json() or {}
    medicine_id = data.get('medicine_id')
    quantity = int(data.get('quantity', 1))

    if not medicine_id:
        return jsonify({'success': False, 'message': 'medicine_id is required'}), 400
    if quantity < 1:
        return jsonify({'success': False, 'message': 'Quantity must be at least 1'}), 400

    medicine = Medicine.query.get(int(medicine_id))
    if not medicine:
        return jsonify({'success': False, 'message': 'Medicine not found'}), 404
    if medicine.stock < quantity:
        return jsonify({'success': False, 'message': 'Insufficient stock'}), 400

    user_id = get_current_user_id()
    item = CartItem.query.filter_by(user_id=user_id, medicine_id=medicine.id).first()
    if item:
        item.quantity += quantity
    else:
        item = CartItem(user_id=user_id, medicine_id=medicine.id, quantity=quantity)
        db.session.add(item)

    db.session.commit()
    return jsonify({'success': True, 'message': 'Added to cart', 'item': item.to_dict()})


@cart_bp.route('/remove', methods=['DELETE'])
@jwt_required()
@role_required('patient', 'admin')
def remove_from_cart():
    data = request.get_json() or {}
    medicine_id = data.get('medicine_id') or request.args.get('medicine_id')
    if not medicine_id:
        return jsonify({'success': False, 'message': 'medicine_id is required'}), 400

    item = CartItem.query.filter_by(user_id=get_current_user_id(), medicine_id=int(medicine_id)).first()
    if not item:
        return jsonify({'success': False, 'message': 'Item not in cart'}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Removed from cart'})


@cart_bp.route('/update', methods=['PUT'])
@jwt_required()
@role_required('patient', 'admin')
def update_cart():
    data = request.get_json() or {}
    medicine_id = data.get('medicine_id')
    quantity = int(data.get('quantity', 1))

    if not medicine_id:
        return jsonify({'success': False, 'message': 'medicine_id is required'}), 400

    item = CartItem.query.filter_by(user_id=get_current_user_id(), medicine_id=int(medicine_id)).first()
    if not item:
        return jsonify({'success': False, 'message': 'Item not in cart'}), 404

    if quantity < 1:
        db.session.delete(item)
    else:
        item.quantity = quantity
    db.session.commit()
    return jsonify({'success': True, 'message': 'Cart updated'})
