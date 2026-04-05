# CareAxis: Hospital_Management_System 

**CareAxis** is a **full-stack healthcare platform** where **patients book appointments**, **doctors manage schedules**, and **admins control the entire system**, all from a **single integrated application**.


**Three roles. One platform.**
- Patients: browse doctors, book slots, pay online
- Doctors: view and manage appointment schedules
- Admins: oversee users, doctors, and platform activity

---

## Live Demo
- Live App: https://care-axis.vercel.app/

---

## Core Features
- **Role-based auth** (Admin / Doctor / Patient) via **JWT**
- **Doctor discovery** and appointment booking
- **Secure online payments** via Razorpay
- **Dedicated dashboards** for Admin and Doctor roles
- **RESTful API** with clean separation of concerns

---

## Tech Stack
| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth** | JWT |
| **Payments** | Razorpay |
| **State** | Context API |

---

## Project Structure
```
CareAxis/
├── admin/          # Admin dashboard (React + Vite)
├── clientside/     # Patient-facing app (React + Vite)
└── server/         # REST API (Node.js + Express)
```

---

## Getting Started

### Prerequisites
- **Node.js v18+**
- **MongoDB** instance (local or Atlas)
- **Razorpay** account (for payment keys)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/CareAxis.git
cd CareAxis
```

### 2. Set up environment variables
Each sub-app has its own `.env.example`. Copy and fill them in:
```bash
cp server/.env.example server/.env
cp clientside/.env.example clientside/.env
cp admin/.env.example admin/.env
```
Key variables in `server/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 3. Install dependencies
```bash
cd server && npm install
cd ../clientside && npm install
cd ../admin && npm install
```

### 4. Run the application
Open **three terminal tabs**:
```bash
# Terminal 1 — Backend
cd server && npm run server

# Terminal 2 — Patient app
cd clientside && npm run dev

# Terminal 3 — Admin panel
cd admin && npm run dev
```

---

## API Overview
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | **Public** |
| `POST` | `/api/auth/login` | Login and get JWT | **Public** |
| `GET` | `/api/doctors` | List all doctors | **Patient** |
| `POST` | `/api/appointments` | Book an appointment | **Patient** |
| `GET` | `/api/appointments` | View appointments | **Doctor** |
| `GET` | `/api/admin/users` | Manage all users | **Admin** |

---

## Contributing
1. **Fork** the repository
2. Create a **feature branch**: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m 'Add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature`
5. Open a **pull request**

---

## Contact
**Pritam Paul**
Email: pritampaul.10000@gmail.com
GitHub: https://github.com/pritampaul00
