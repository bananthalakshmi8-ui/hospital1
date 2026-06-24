from models import db, utcnow


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    medicine_id = db.Column(db.Integer, db.ForeignKey('medicines.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=utcnow)

    __table_args__ = (db.UniqueConstraint('user_id', 'medicine_id', name='unique_user_medicine_cart'),)

    def to_dict(self):
        medicine = self.medicine.to_dict() if self.medicine else {}
        return {
            'id': self.id,
            'medicine_id': self.medicine_id,
            'quantity': self.quantity,
            **medicine,
        }
