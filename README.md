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

# MongoDB Atlas Setup

This guide explains how to set up MongoDB Atlas and connect it to the backend application.

---

## Step 1: Create a MongoDB Atlas Account

1. Go to https://www.mongodb.com/atlas
2. Sign up using Email, Google, or GitHub
3. Verify your email and log in to the dashboard

---

## Step 2: Create a Cluster

1. Click **Create** → **Cluster**
2. Select **Shared Cluster (Free Tier – M0)**
3. Choose a cloud provider (AWS / GCP / Azure)
4. Select the nearest region (e.g., Mumbai)
5. Click **Create Cluster**

> Cluster creation may take a few minutes.

---

## Step 3: Create a Database User

1. Navigate to **Database Access**
2. Click **Add New Database User**
3. Enter a username and password
4. Set the role to **Read and write to any database**
5. Save the user credentials

---

## Step 4: Configure Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. Choose one option:
   - `0.0.0.0/0` (Allow access from anywhere – development only)
   - Your system/server IP (recommended for production)
4. Click **Confirm**

---

## Step 5: Get MongoDB Connection String

1. Open **Clusters**
2. Click **Connect**
3. Select **Connect your application**
4. Choose:
   - Driver: Node.js
   - Version: Latest
5. Copy the connection string


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


