import json
import os

from models import db
from models.doctor import Doctor
from models.lab_test import LabTest
from models.medicine import Medicine
from models.user import User


def seed_database():
    if Medicine.query.first():
        return

    medicines = [
        {
            'name': 'Paracetamol 500mg', 'category': 'medicines', 'price': 45, 'original_price': 60,
            'discount': 25, 'stock': 500, 'rating': 4.8, 'reviews': 234, 'bestseller': True,
            'image': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
            'description': 'Fast-acting pain relief and fever reducer.',
            'ingredients': 'Paracetamol 500mg per tablet', 'usage': 'Take 1-2 tablets every 4-6 hours.',
            'benefits': json.dumps(['Reduces fever', 'Effective pain relief', 'Gentle on stomach']),
        },
        {
            'name': 'Vitamin D3 60000 IU', 'category': 'vitamins', 'price': 299, 'original_price': 399,
            'discount': 25, 'stock': 200, 'rating': 4.9, 'reviews': 567, 'bestseller': True,
            'image': 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop',
            'description': 'High potency Vitamin D3 supplement for bone health and immunity boost.',
            'ingredients': 'Cholecalciferol (Vitamin D3) 60000 IU',
            'usage': 'Take 1 capsule once weekly.',
            'benefits': json.dumps(['Strengthens bones', 'Boosts immune system']),
        },
        {
            'name': 'Omega-3 Fish Oil', 'category': 'supplements', 'price': 549, 'original_price': 699,
            'discount': 21, 'stock': 150, 'rating': 4.7, 'reviews': 189, 'bestseller': True,
            'image': 'https://images.unsplash.com/photo-1505751172876-ba859b242775?w=400&h=400&fit=crop',
            'description': 'Premium fish oil capsules rich in EPA and DHA.',
            'ingredients': 'Fish Oil 1000mg', 'usage': 'Take 1-2 softgels daily with meals.',
            'benefits': json.dumps(['Supports heart health', 'Improves brain function']),
        },
        {
            'name': 'Moisturizing Face Cream', 'category': 'skin-care', 'price': 449, 'original_price': 599,
            'discount': 25, 'stock': 120, 'rating': 4.5, 'reviews': 312, 'bestseller': True,
            'image': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
            'description': 'Dermatologist-tested moisturizing cream for all skin types.',
            'ingredients': 'Hyaluronic Acid, Glycerin, Vitamin E',
            'usage': 'Apply evenly on face and neck twice daily.',
            'benefits': json.dumps(['24-hour hydration', 'SPF 15 protection']),
        },
        {
            'name': 'Glucometer Kit', 'category': 'diabetes-care', 'price': 1299, 'original_price': 1599,
            'discount': 19, 'stock': 80, 'rating': 4.8, 'reviews': 156, 'bestseller': False,
            'image': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=400&fit=crop',
            'description': 'Accurate blood glucose monitoring system.',
            'ingredients': 'N/A - Medical Device', 'usage': 'Follow included instruction manual.',
            'benefits': json.dumps(['Results in 5 seconds', 'Memory for 500 readings']),
        },
        {
            'name': 'Digital BP Monitor', 'category': 'health-devices', 'price': 2499, 'original_price': 2999,
            'discount': 17, 'stock': 60, 'rating': 4.7, 'reviews': 278, 'bestseller': True,
            'image': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
            'description': 'Clinically validated automatic blood pressure monitor.',
            'ingredients': 'N/A - Medical Device', 'usage': 'Wrap cuff on upper arm.',
            'benefits': json.dumps(['Clinically validated', 'Irregular heartbeat detection']),
        },
    ]
    for m in medicines:
        db.session.add(Medicine(**m))

    doctors = [
        {
            'name': 'Dr. Sarah Mitchell', 'specialization': 'Cardiologist', 'department': 'cardiology',
            'experience': 15, 'consultation_fee': 1500, 'availability': 'available', 'rating': 4.9, 'reviews': 234,
            'image': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
            'education': 'MD, DM Cardiology - Harvard Medical School', 'languages': 'English,Hindi',
            'about': 'Expert in interventional cardiology with 15+ years of experience.',
        },
        {
            'name': 'Dr. James Wilson', 'specialization': 'Neurologist', 'department': 'neurology',
            'experience': 12, 'consultation_fee': 1800, 'availability': 'available', 'rating': 4.8, 'reviews': 189,
            'image': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
            'education': 'MD, DM Neurology - Johns Hopkins', 'languages': 'English',
            'about': 'Specializes in stroke management and epilepsy.',
        },
        {
            'name': 'Dr. Priya Sharma', 'specialization': 'Orthopedic', 'department': 'orthopedic',
            'experience': 10, 'consultation_fee': 1200, 'availability': 'busy', 'rating': 4.7, 'reviews': 312,
            'image': 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
            'education': 'MS Orthopedics - AIIMS Delhi', 'languages': 'English,Hindi,Punjabi',
            'about': 'Joint replacement specialist with expertise in sports injuries.',
        },
        {
            'name': 'Dr. Rajesh Kumar', 'specialization': 'General Physician', 'department': 'general',
            'experience': 20, 'consultation_fee': 800, 'availability': 'available', 'rating': 4.9, 'reviews': 567,
            'image': 'https://images.unsplash.com/photo-1537368910025-700350f70a0e?w=400&h=400&fit=crop',
            'education': 'MBBS, MD Internal Medicine - CMC Vellore', 'languages': 'English,Hindi,Tamil',
            'about': 'Comprehensive primary care with focus on preventive medicine.',
        },
    ]
    for d in doctors:
        db.session.add(Doctor(**d))

    lab_tests = [
        {
            'test_name': 'Complete Blood Count (CBC)', 'price': 399, 'original_price': 499,
            'description': 'Comprehensive blood analysis including RBC, WBC, platelets.',
            'duration': '6 hours', 'fasting': False, 'popular': True, 'parameters': 25,
            'image': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop',
        },
        {
            'test_name': 'Thyroid Profile (T3, T4, TSH)', 'price': 599, 'original_price': 799,
            'description': 'Complete thyroid function test.',
            'duration': '12 hours', 'fasting': False, 'popular': True, 'parameters': 3,
            'image': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
        },
        {
            'test_name': 'HbA1c & Fasting Blood Sugar', 'price': 449, 'original_price': 599,
            'description': 'Diabetes screening package.',
            'duration': '8 hours', 'fasting': True, 'popular': True, 'parameters': 2,
            'image': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
        },
        {
            'test_name': 'Liver Function Test (LFT)', 'price': 699, 'original_price': 899,
            'description': 'Comprehensive liver health assessment.',
            'duration': '12 hours', 'fasting': True, 'popular': True, 'parameters': 10,
            'image': 'https://images.unsplash.com/photo-1579684385127-1ef15d508a1e?w=400&h=300&fit=crop',
        },
        {
            'test_name': 'Kidney Function Test (KFT)', 'price': 649, 'original_price': 849,
            'description': 'Kidney health panel including creatinine and urea.',
            'duration': '12 hours', 'fasting': False, 'popular': True, 'parameters': 8,
            'image': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
        },
    ]
    for t in lab_tests:
        db.session.add(LabTest(**t))

    if not User.query.filter_by(email='admin@medicareplus.com').first():
        admin = User(name='Admin User', email='admin@medicareplus.com', role='admin')
        admin.set_password('admin123')
        db.session.add(admin)

    if not User.query.filter_by(email='doctor@medicareplus.com').first():
        doctor_user = User(name='Dr. Sarah Mitchell', email='doctor@medicareplus.com', role='doctor')
        doctor_user.set_password('doctor123')
        db.session.add(doctor_user)
        db.session.flush()
        first_doctor = Doctor.query.filter_by(name='Dr. Sarah Mitchell').first()
        if first_doctor:
            first_doctor.user_id = doctor_user.id

    if not User.query.filter_by(email='patient@medicareplus.com').first():
        patient = User(name='John Doe', email='patient@medicareplus.com', role='patient', phone='9876543210')
        patient.set_password('patient123')
        db.session.add(patient)

    db.session.commit()


def ensure_upload_dirs(upload_folder):
    os.makedirs(upload_folder, exist_ok=True)
