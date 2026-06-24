from models import db, utcnow


class LabTest(db.Model):
    __tablename__ = 'lab_tests'

    id = db.Column(db.Integer, primary_key=True)
    test_name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float)
    duration = db.Column(db.String(50))
    fasting = db.Column(db.Boolean, default=False)
    popular = db.Column(db.Boolean, default=False)
    parameters = db.Column(db.Integer, default=0)
    image = db.Column(db.String(500))

    bookings = db.relationship('LabTestBooking', backref='lab_test', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.test_name,
            'test_name': self.test_name,
            'shortName': self.test_name.split('(')[0].strip(),
            'description': self.description,
            'price': self.price,
            'originalPrice': self.original_price or self.price,
            'duration': self.duration,
            'fasting': self.fasting,
            'popular': self.popular,
            'parameters': self.parameters,
            'image': self.image,
        }


class LabTestBooking(db.Model):
    __tablename__ = 'lab_test_bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    lab_test_id = db.Column(db.Integer, db.ForeignKey('lab_tests.id'), nullable=False)
    booking_date = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=utcnow)

    user = db.relationship('User', backref='lab_test_bookings', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'lab_test_id': self.lab_test_id,
            'lab_test': self.lab_test.to_dict() if self.lab_test else None,
            'booking_date': self.booking_date,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
