from flask import Blueprint, jsonify, request

from models.medicine import Medicine

medicines_bp = Blueprint('medicines', __name__, url_prefix='/api/medicines')


@medicines_bp.route('', methods=['GET'])
def get_medicines():
    category = request.args.get('category')
    search = request.args.get('search', '').strip().lower()
    sort_by = request.args.get('sort', 'popular')
    max_price = request.args.get('max_price', type=float)

    query = Medicine.query
    if category and category != 'all':
        query = query.filter_by(category=category)
    if search:
        query = query.filter(Medicine.name.ilike(f'%{search}%'))
    if max_price is not None:
        query = query.filter(Medicine.price <= max_price)

    medicines = query.all()
    if sort_by == 'price-low':
        medicines.sort(key=lambda m: m.price)
    elif sort_by == 'price-high':
        medicines.sort(key=lambda m: m.price, reverse=True)
    elif sort_by == 'rating':
        medicines.sort(key=lambda m: m.rating, reverse=True)
    else:
        medicines.sort(key=lambda m: (not m.bestseller, -m.rating))

    return jsonify({
        'success': True,
        'medicines': [m.to_dict() for m in medicines],
        'count': len(medicines),
    })


@medicines_bp.route('/<int:medicine_id>', methods=['GET'])
def get_medicine(medicine_id):
    medicine = Medicine.query.get(medicine_id)
    if not medicine:
        return jsonify({'success': False, 'message': 'Medicine not found'}), 404
    return jsonify({'success': True, 'medicine': medicine.to_dict()})
