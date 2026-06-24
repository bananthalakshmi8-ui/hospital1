import json

from models import db


class Medicine(db.Model):
    __tablename__ = 'medicines'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float)
    discount = db.Column(db.Integer, default=0)
    stock = db.Column(db.Integer, default=0)
    image = db.Column(db.String(500))
    rating = db.Column(db.Float, default=4.5)
    reviews = db.Column(db.Integer, default=0)
    ingredients = db.Column(db.Text)
    usage = db.Column(db.Text)
    benefits = db.Column(db.Text)
    bestseller = db.Column(db.Boolean, default=False)

    order_items = db.relationship('OrderItem', backref='medicine', lazy=True)
    cart_items = db.relationship('CartItem', backref='medicine', lazy=True)

    def _parse_benefits(self):
        if not self.benefits:
            return []
        try:
            return json.loads(self.benefits)
        except (json.JSONDecodeError, TypeError):
            return []

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'description': self.description,
            'price': self.price,
            'originalPrice': self.original_price or self.price,
            'original_price': self.original_price or self.price,
            'discount': self.discount or 0,
            'stock': self.stock,
            'image': self.image,
            'rating': self.rating,
            'reviews': self.reviews,
            'ingredients': self.ingredients,
            'usage': self.usage,
            'benefits': self._parse_benefits(),
            'inStock': self.stock > 0,
            'bestseller': self.bestseller,
        }
