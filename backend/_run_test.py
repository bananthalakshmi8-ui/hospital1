import sys
sys.path.insert(0, '.')
from app import app
c = app.test_client()
r = c.get('/api/health')
print('HEALTH', r.status_code, r.get_json())
r2 = c.get('/api/medicines')
d = r2.get_json()
print('MEDICINES', r2.status_code, d.get('count'))
r3 = c.post('/api/auth/login', json={'email':'patient@medicareplus.com','password':'patient123'})
print('LOGIN', r3.status_code, r3.get_json().get('success'))
