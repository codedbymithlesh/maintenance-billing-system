# 🏢 Society Management & Billing System (SMBS)

A modern web-based Society Management and Billing System built to digitize and simplify apartment/society operations.

This application allows administrators to manage residents, generate bills, track payments, and monitor transactions through a clean and responsive dashboard. It reduces manual paperwork and makes society management faster, organized, and efficient.

---

## 📌 Project Overview

Managing society records manually is time-consuming and error-prone.  
SMBS solves this problem by providing:

• Centralized member records  
• Digital billing system  
• Payment tracking  
• Admin dashboard for monitoring  

The system is designed with performance, simplicity, and scalability in mind.

---

## 🚀 Features

### 🔐 Authentication
- Secure login/logout
- Protected routes
- Session management

<!-- ### 👥 Member Management
- Add members
- Update member details
- Delete members
- Search & filter members -->

### 💳 Billing System
- Generate monthly bills
- Track due payments
- View payment status
- Maintain history

### 📊 Dashboard
- Overview statistics
- Total members
- Total payments
- Pending dues
- Recent activities

### 🎨 UI/UX
- Responsive design (mobile friendly)
- Modern dashboard layout
- Fast loading
- Clean interface

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React (Icons)

### Tools & Utilities
- Node.js
- npm

---

## 📂 Folder Structure

```bash
SMBS
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── residentController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── Bill.js
│   │   ├── Payment.js
│   │   └── User.js
│   ├── node_modules
│   ├── routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── residentRoutes.js
│   ├── server.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json
│
├── frontend
│   ├── public
│   │   └── favicon.svg
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   └── NavBar.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   │──AdminDashboard.jsx
│   │   │   │   │──ManageBills.jsx
│   │   │   │   └──Resident.jsx
│   │   │   ├── client
│   │   │   │   └──ResidentDashboard.jsx
│   │   │   ├──AdminRegister.jsx
│   │   │   ├──Loading.jsx
│   │   │   ├──Login.jsx
│   │   │   └──NotFound.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── .env
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

---



## 👨‍💻 Author

Mithlesh Rajbhar

---

## 📄 License

This project is free to use for educational and learning purposes.

### 📑 Clone the Repository
```bash
git clone https://github.com/codedbymithlesh/maintenance-billing-system.git
```
