ve# CareAxis 🏥

CareAxis is a full-stack healthcare appointment booking platform that enables
patients to book doctor appointments, doctors to manage schedules, and admins
to oversee the system.


## ✨ Features
- Role-based authentication (Admin / Doctor / Patient)
- Doctor appointment booking
- Secure online payments
- Admin & Doctor dashboards
- RESTful API architecture
  

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Payments
- Razorpay


## 📂 Project Structure
```bash
CareAxis/
├── admin/
├── clientside/
├── server/
```


## ⚙️ Environment Setup

Create `.env` files using the provided `.env.example` files:

- `server/.env.example`
- `clientside/.env.example`
- `admin/.env.example`

Copy each `.env.example` to `.env` and fill in the required values.



## ▶️ How to Run Locally

### 1️⃣ Install dependencies
```bash
cd server && npm install
cd ../clientside && npm install
cd ../admin && npm install
```
### 2️⃣ Start the servers
### Backend
```bash
cd server
npm run server
```

### Clientside
```bash
cd clientside
npm run dev
```

### Admin
```bash
cd admin
npm run dev
```


