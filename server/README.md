# 🏨 PMS Mock API – Powered by JSON Server

A simple mock API for a Property Management System (PMS), using `json-server`. This simulates listing properties and booking them, perfect for frontend testing and task evaluations.

---

## 📦 Requirements

- Node.js (v14 or higher)
- [json-server](https://github.com/typicode/json-server)

---

## 🚀 Getting Started

### 1. Install `json-server` globally (if not already)

```bash
npm install -g json-server
```

### 2. Copy the `db.json` file into your project.

### 3. Run the mock API server

```bash
json-server --watch db.json --port 4000
```

> API will be available at: `http://localhost:4000/`

---

## 📚 API Endpoints

### 🔐 Simulate Admin Login

You can simulate login by filtering the `users` collection.

**Request:**

```bash
curl "http://localhost:4000/users?email=admin@example.com&password=admin123"
```

**Expected Response:**

```json
[
  {
    "id": 1,
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }
]
```

> ⚠️ **Note**: No actual authentication or token is issued—this is mock-only for frontend simulation.

---

### 🔹 Properties

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| GET    | /properties     | Get all properties    |
| GET    | /properties/:id | Get a single property |
| POST   | /properties     | Add a new property    |
| PUT    | /properties/:id | Update a property     |
| DELETE | /properties/:id | Delete a property     |

#### 🔍 Example

```bash
curl http://localhost:4000/properties
```

---

### 📆 Bookings

| Method | Endpoint                                                           | Description       |
| ------ | ------------------------------------------------------------------ | ----------------- |
| GET    | /bookings                                                          | List all bookings |
| POST   | /bookings                                                          | Create a booking  |
| GET    | /bookings?guestEmail=[email@example.com](mailto:email@example.com) | Filter by guest   |
| PUT    | /bookings/\:id                                                     | Update a booking  |
| DELETE | /bookings/\:id                                                     | Cancel a booking  |

#### ✅ Simulate Guest Booking Lookup

Guests can "log in" by providing their email.

**Request:**

```bash
curl "http://localhost:4000/bookings?guestEmail=alice@example.com"
```

**Response:**

```json
[
  {
    "id": 1,
    "propertyId": 1,
    "guestName": "Alice Smith",
    "guestEmail": "alice@example.com",
    "checkIn": "2025-07-01",
    "checkOut": "2025-07-07",
    "status": "confirmed"
  }
]
```

---

### ✍️ Create New Booking

```bash
curl -X POST http://localhost:4000/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "propertyId": 2,
    "guestName": "Jane Doe",
    "guestEmail": "jane@example.com",
    "checkIn": "2025-08-10",
    "checkOut": "2025-08-15",
    "status": "pending"
  }'
```

---

## 📝 Notes

* All data is stored in `db.json`.
* No real validation or authentication is enforced (this is a mock server).
* You can enhance the task by simulating filtering, searching, or pagination.

---

Happy coding! 🚀
