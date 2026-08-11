# Visitor Pass Management System

A full-stack web application designed to streamline visitor check-ins, pass generation, security approvals, host notifications, and analytics dashboard.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS / Vanilla CSS, Lucide Icons, React Router
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication

## 📁 Project Structure

```
Visitor-Pass-Management-System/
├── backend/            # Express REST API & Database models
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── .env.example    # Example environment variables
│   └── package.json
├── frontend/           # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── routes/
│   └── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database (local instance or MongoDB Atlas)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` based on `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run the backend server:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## 📜 Features

- 👤 **Role-Based Access Control**: Admin, Host, Security, and Visitor modules.
- 🎟️ **Pass Generation**: Instant pass generation with QR code / tracking details.
- 📊 **Dashboard & Analytics**: Real-time stats on active visitors, approved passes, and visit history.
- 🔐 **Secure Authentication**: Password hashing and JWT token-based authorization.
