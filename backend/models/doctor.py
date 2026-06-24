from models import db


class Doctor(db.Model):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    name = db.Column(db.String(120), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(50))
    experience = db.Column(db.Integer, default=0)
    consultation_fee = db.Column(db.Float, nullable=False, default=0)
    availability = db.Column(db.String(20), default='available')
    rating = db.Column(db.Float, default=4.5)
    reviews = db.Column(db.Integer, default=0)
    image = db.Column(db.String(500))
    education = db.Column(db.String(255))
    languages = db.Column(db.String(255))
    about = db.Column(db.Text)

    appointments = db.relationship('Appointment', backref='doctor', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialization': self.specialization,
            'department': self.department,
            'experience': self.experience,
            'fee': self.consultation_fee,
            'consultation_fee': self.consultation_fee,
            'availability': self.availability,
            'rating': self.rating,
            'reviews': self.reviews,
            'image': self.image,
            'education': self.education,
            'languages': self.languages.split(',') if self.languages else [],
            'about': self.about,
        }
