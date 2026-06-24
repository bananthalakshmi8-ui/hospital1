# MediCare Plus — Flask Backend API

Production-ready REST API for the MediCare Plus Hospital + Medical eCommerce frontend.

## Tech Stack

- Python Flask 3
- Flask-CORS
- Flask-SQLAlchemy
- Flask-JWT-Extended
- SQLite (development)
- MySQL via PyMySQL (production)

## Quick Start

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux

python app.py
```

API runs at **http://localhost:5000**

Health check: `GET http://localhost:5000/api/health`

## Default Seed Accounts

| Role    | Email                    | Password    |
|---------|--------------------------|-------------|
| Admin   | admin@medicareplus.com   | admin123    |
| Doctor  | doctor@medicareplus.com  | doctor123   |
| Patient | patient@medicareplus.com | patient123  |

## Frontend Connection

The API is designed to match existing frontend data shapes (`products.js`, `doctors.js`, `labTests.js`).

**Base URL:** `http://localhost:5000`

**Auth header:** `Authorization: Bearer <token>`

Add to your frontend `.env` (when ready to connect):

```env
VITE_API_URL=http://localhost:5000
```

Example fetch (no UI changes required until you wire this in):

```javascript
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Public
fetch(`${API}/api/medicines`)
fetch(`${API}/api/doctors`)
fetch(`${API}/api/lab-tests`)

// Auth
fetch(`${API}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
```

CORS is enabled for `http://localhost:5173` and `http://localhost:5174`.

---

## API Documentation

### Authentication

| Method | Endpoint              | Auth | Description          |
|--------|-----------------------|------|----------------------|
| POST   | `/api/auth/register`  | No   | Register patient     |
| POST   | `/api/auth/login`     | No   | Login, returns JWT   |
| POST   | `/api/auth/logout`    | Yes  | Logout               |
| GET    | `/api/auth/profile`   | Yes  | Get current user     |

**Register / Login body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJ...",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "patient" }
}
```

---

### Doctors

| Method | Endpoint                  | Auth | Description        |
|--------|---------------------------|------|--------------------|
| GET    | `/api/doctors`            | No   | List all doctors   |
| GET    | `/api/doctors/:id`        | No   | Get doctor by ID   |

**Query params:** `department`, `availability`, `search`

---

### Appointments

| Method | Endpoint                                | Role           | Description              |
|--------|-----------------------------------------|----------------|--------------------------|
| GET    | `/api/appointments`                     | All roles      | List appointments        |
| POST   | `/api/appointments/book`                | Patient        | Book appointment         |
| PUT    | `/api/appointments/:id/cancel`          | Patient        | Cancel appointment       |
| PUT    | `/api/appointments/:id/approve`         | Doctor, Admin  | Approve appointment      |
| PUT    | `/api/appointments/:id/reject`          | Doctor, Admin  | Reject appointment       |
| PUT    | `/api/appointments/:id/complete`        | Doctor, Admin  | Complete appointment     |

**Book body:**
```json
{
  "doctor_id": 1,
  "date": "2024-06-25",
  "time": "10:00 AM",
  "symptoms": "Chest pain"
}
```

---

### Pharmacy / Medicines

| Method | Endpoint                  | Auth | Description         |
|--------|---------------------------|------|---------------------|
| GET    | `/api/medicines`          | No   | List medicines      |
| GET    | `/api/medicines/:id`      | No   | Get medicine by ID  |

**Query params:** `category`, `search`, `sort`, `max_price`

---

### Cart

| Method | Endpoint              | Auth    | Description       |
|--------|-----------------------|---------|-------------------|
| GET    | `/api/cart`           | Patient | Get cart items    |
| POST   | `/api/cart/add`       | Patient | Add to cart       |
| DELETE | `/api/cart/remove`    | Patient | Remove from cart  |
| PUT    | `/api/cart/update`    | Patient | Update quantity   |

**Add body:** `{ "medicine_id": 1, "quantity": 2 }`

---

### Orders

| Method | Endpoint                | Auth    | Description      |
|--------|-------------------------|---------|------------------|
| GET    | `/api/orders`           | Patient | List user orders |
| POST   | `/api/orders/create`    | Patient | Create order     |
| GET    | `/api/orders/:id`       | Patient | Get order by ID  |

**Create body:**
```json
{
  "shipping_address": "123 Main St, Mumbai",
  "payment_method": "cod"
}
```

---

### Lab Tests

| Method | Endpoint                    | Auth    | Description          |
|--------|-----------------------------|---------|----------------------|
| GET    | `/api/lab-tests`            | No      | List lab tests       |
| GET    | `/api/lab-tests/:id`        | No      | Get lab test by ID   |
| POST   | `/api/lab-tests/book`       | Patient | Book lab test        |
| GET    | `/api/lab-tests/bookings`   | Patient | User's bookings      |

**Book body:** `{ "lab_test_id": 1, "date": "2024-06-25" }`

---

### Prescriptions

| Method | Endpoint                              | Auth    | Description           |
|--------|---------------------------------------|---------|-----------------------|
| POST   | `/api/prescriptions/upload`           | Patient | Upload JPG/PNG/PDF    |
| GET    | `/api/prescriptions`                  | Patient | List user uploads     |
| GET    | `/api/prescriptions/files/:id`        | Patient | Download file         |

**Upload:** `multipart/form-data` with field `file`

---

### Admin

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | `/api/admin/users`              | List all users           |
| DELETE | `/api/admin/users/:id`          | Delete user              |
| GET    | `/api/admin/doctors`            | List doctors             |
| POST   | `/api/admin/doctors`            | Create doctor            |
| PUT    | `/api/admin/doctors/:id`        | Update doctor            |
| DELETE | `/api/admin/doctors/:id`        | Delete doctor            |
| GET    | `/api/admin/medicines`          | List medicines           |
| POST   | `/api/admin/medicines`          | Create medicine          |
| PUT    | `/api/admin/medicines/:id`      | Update medicine          |
| DELETE | `/api/admin/medicines/:id`      | Delete medicine          |
| GET    | `/api/admin/orders`             | List all orders          |
| GET    | `/api/admin/appointments`       | List all appointments    |
| GET    | `/api/admin/reports`            | Dashboard statistics     |

All admin routes require `role: admin` JWT.

---

## Production (MySQL)

Set environment variables:

```env
FLASK_ENV=production
DATABASE_URL=mysql+pymysql://user:password@host:3306/medicare_plus
SECRET_KEY=strong-random-secret
JWT_SECRET_KEY=strong-jwt-secret
```

Create MySQL database:

```sql
CREATE DATABASE medicare_plus CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## Project Structure

```
backend/
├── app.py                 # Application entry point
├── config.py              # SQLite / MySQL configuration
├── requirements.txt
├── .env.example
├── models/
│   ├── user.py
│   ├── doctor.py
│   ├── appointment.py
│   ├── medicine.py
│   ├── order.py
│   ├── lab_test.py
│   ├── prescription.py
│   └── cart.py
├── routes/
│   ├── auth.py
│   ├── doctors.py
│   ├── appointments.py
│   ├── medicines.py
│   ├── cart.py
│   ├── orders.py
│   ├── lab_tests.py
│   ├── prescriptions.py
│   └── admin.py
├── services/
│   ├── auth_service.py    # JWT middleware & role guards
│   └── seed_data.py       # Sample seed data
├── uploads/prescriptions/ # Uploaded prescription files
└── database/              # SQLite database (dev)
```

## Error Responses

All errors return:

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP status codes: `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found, `409` Conflict, `500` Server Error
