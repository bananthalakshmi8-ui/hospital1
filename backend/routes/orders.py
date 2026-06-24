from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from models import db
from models.cart import CartItem
from models.order import Order, OrderItem
from models.user import User
from services.auth_service import get_current_user_id, role_required

orders_bp = Blueprint('orders', __name__, url_prefix='/api/orders')


@orders_bp.route('', methods=['GET'])
@jwt_required()
@role_required('patient', 'admin')
def get_orders():
    user_id = get_current_user_id()
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return jsonify({
        'success': True,
        'orders': [o.to_dict() for o in orders],
        'count': len(orders),
    })


@orders_bp.route('/create', methods=['POST'])
@jwt_required()
@role_required('patient', 'admin')
def create_order():
    data = request.get_json() or {}
    user_id = get_current_user_id()
    cart_items = CartItem.query.filter_by(user_id=user_id).all()

    if not cart_items:
        return jsonify({'success': False, 'message': 'Cart is empty'}), 400

    total = 0
    order = Order(
        user_id=user_id,
        total_amount=0,
        status='pending',
        shipping_address=data.get('shipping_address', ''),
        payment_method=data.get('payment_method', 'cod'),
    )
    db.session.add(order)
    db.session.flush()

    for cart_item in cart_items:
        medicine = cart_item.medicine
        if not medicine or medicine.stock < cart_item.quantity:
            db.session.rollback()
            return jsonify({'success': False, 'message': f'Insufficient stock for {medicine.name if medicine else "item"}'}), 400

        line_total = medicine.price * cart_item.quantity
        total += line_total
        medicine.stock -= cart_item.quantity

        db.session.add(OrderItem(
            order_id=order.id,
            medicine_id=medicine.id,
            quantity=cart_item.quantity,
            price=medicine.price,
        ))
        db.session.delete(cart_item)

    order.total_amount = total
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Order placed successfully',
        'order': order.to_dict(),
    }), 201


@orders_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
@role_required('patient', 'admin')
def get_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'success': False, 'message': 'Order not found'}), 404
    if order.user_id != get_current_user_id():
        user = User.query.get(get_current_user_id())
        if not user or user.role != 'admin':
            return jsonify({'success': False, 'message': 'Unauthorized'}), 403
    return jsonify({'success': True, 'order': order.to_dict()})
