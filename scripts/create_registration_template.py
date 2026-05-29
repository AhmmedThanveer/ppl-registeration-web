from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws.title = 'Registrations'
headers = [
    'Name',
    'Email',
    'Phone',
    'Position',
    'Blood Group',
    'Photo File Name',
    'Aadhar File Name',
    'Payment File Name',
    'Registration Date'
]
ws.append(headers)
ws.append([
    'John Doe',
    'john@example.com',
    '+919876543210',
    'Forward',
    'A+',
    'photo.jpg',
    'aadhar.jpg',
    'payment.jpg',
    '2026-05-29 12:00:00'
])
wb.save('registration-template.xlsx')
