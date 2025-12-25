# Inventory Management System

A basic inventory management system to manage users, products, and stock levels using MongoDB with a clean and scalable design.

---

## 🚀 Features

- User authentication (login & protected routes)
- Product management
- Inventory tracking
- Low stock indicator when quantity is below 10
- Search products by **Product Name** or **CAS Number**
- Frontend and backend separation
- MongoDB-based data storage
- Strong data validation rules:
   Quantity must always be a positive number
   Negative stock values are not allowed
   CAS number must be unique

---

## 🛠️ Tech Stack

- Frontend: React
- Styling: Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB
---

## 📦 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/FaizanSurani/Inventory-Management.git

cd inventory-management
```

### 2. Install Dependinces
```bash
cd backend && npm install
cd frontend && npm install
```

### 3. Environment Variables
```bash
MONGO_DB_URI=your_database_connection_string
```

### 4. Run the Project
```bash
# Start backend
cd backend && npm start

# In another terminal, start frontend
cd frontend && npm run dev
```

### Database Models (MongoDB)

### 1. User Model
{
  name: String,
  email: String,
  password: String,
}

### 2. Product Model
{
  productName: String,
  casNumber: String,
  unit: String,
}

### 3. Inventory Model
{
  productId: ObjectId, // reference to Product
  stockQty: Number,
}


