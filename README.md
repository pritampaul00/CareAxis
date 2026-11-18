<div align="center">

# CareAxis

### A role-based healthcare appointment management platform

Patients discover doctors and book appointments. Doctors manage their schedules. Administrators manage doctors and oversee appointments.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-ESM-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-not%20specified-lightgrey)](#license)

[Live application](https://care-axis.vercel.app/) · [Report an issue](https://github.com/pritampaul00/CareAxis/issues)

</div>

---

## Overview

CareAxis is a full-stack hospital appointment management application with separate experiences for patients, doctors, and administrators.

### What you can do

- **Patients:** create an account, browse doctors by speciality, view doctor profiles, book appointments, manage profile details, and pay for appointments through Razorpay.
- **Doctors:** sign in to a dedicated dashboard, review appointments, update appointment status, and manage profile information.
- **Administrators:** sign in to an admin dashboard, add doctors, manage doctor availability, review appointments, and view dashboard information.

## Screens and workflows

| Application | Main capabilities |
| --- | --- |
| Patient app (`clientside/`) | Home, doctor directory and speciality filters, authentication, appointment booking, profile, appointment history, Razorpay payment |
| Admin and doctor portal (`admin/`) | Admin dashboard, doctor creation and list, appointment management, doctor dashboard, doctor appointments and profile |
| REST API (`server/`) | User, doctor and admin routes, JWT-based role middleware, MongoDB persistence, Cloudinary configuration and Razorpay integration |

## Technology and architecture

| Layer | Technologies |
| --- | --- |
| Patient frontend | React 18, Vite 5, React Router, Tailwind CSS, Axios, Context API |
| Admin/doctor frontend | React 18, Vite 5, React Router, Tailwind CSS, Axios, Context API |
| Backend | Node.js (ES modules), Express 4 |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Tokens, bcrypt, role-specific middleware |
| Payments | Razorpay |
| Image storage | Cloudinary, Multer and Streamifier |
| Middleware and utilities | Helmet, CORS, Morgan, dotenv, Validator |

The repository uses three independently installed applications. The two React clients call the Express API through `VITE_BACKEND_URL`. The API mounts separate routers at `/api/user`, `/api/doctor`, and `/api/admin`. MongoDB stores application records. Cloudinary handles image storage configuration, and Razorpay handles the payment flow.

```text
CareAxis/
├── clientside/          # Patient-facing React application
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
├── admin/               # Admin and doctor React portal
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
└── server/              # Express REST API
    ├── config/          # MongoDB and Cloudinary setup
    ├── controllers/
    ├── middlewares/     # Authentication, uploads and errors
    ├── models/
    └── routes/
```

## Requirements

- Node.js 18 or later and npm
- A MongoDB database, local or hosted
- Cloudinary credentials for image uploads
- Razorpay credentials for payment processing

The backend defaults to port `4000`. The frontend apps use Vite's default development port unless configured otherwise.

## Installation and quickstart

Run each command from the repository root in its own terminal where indicated.

### 1. Get the code

```bash
git clone https://github.com/pritampaul00/CareAxis.git
cd CareAxis
```

### 2. Configure environment variables

Create local environment files from the examples:

```bash
cp server/.env.example server/.env
cp clientside/.env.example clientside/.env
cp admin/.env.example admin/.env
```

Fill in the values. Do not commit `.env` files or real credentials.

**`server/.env`**

```dotenv
PORT=4000
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_secret
MONGODB_URI=your_mongodb_connection_string
CURRENCY=INR

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_a_strong_password

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
```

`CLIENT_URL` is used by the Express CORS configuration. The checked-in server example does not currently list it, so add it to your local file and consider adding it to `server/.env.example`. If you serve both frontend apps from different origins, update the backend CORS configuration to allow both origins.

**`clientside/.env`**

```dotenv
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

**`admin/.env`**

```dotenv
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=₹
```

Only expose values intended for browser use through `VITE_` variables. Keep database credentials, JWT secrets, Razorpay secret, and Cloudinary secret on the server.

### 3. Install dependencies

```bash
cd server && npm install
cd ../clientside && npm install
cd ../admin && npm install
```

For repeatable installs in CI, use `npm ci` in each directory instead.

### 4. Start the applications

Open three terminals from the repository root.

**Terminal 1, API**

```bash
cd server
npm run server
```

**Terminal 2, patient app**

```bash
cd clientside
npm run dev
```

**Terminal 3, admin and doctor portal**

```bash
cd admin
npm run dev
```

Open the Vite URLs printed in the terminal. The patient app normally runs at `http://localhost:5173`. The admin portal normally uses the next available Vite port, often `http://localhost:5174`.

Check the API with:

```bash
curl http://localhost:4000/health
```

Expected response:

```json
{"status":"OK"}
```

## Usage

1. Open the patient app and register or sign in.
2. Browse the doctor directory. Filter by speciality and open a doctor's profile.
3. Select an available appointment slot and submit the booking.
4. Complete the Razorpay payment flow when payment is enabled and configured.
5. Open the admin/doctor portal. Sign in with the configured admin account or a doctor account to access the matching dashboard.
6. Use the relevant dashboard to manage doctors, availability, appointments, and profile details.

### API examples

The API base URL in local development is `http://localhost:4000`.

```bash
# API health
curl http://localhost:4000/health

# Public doctor directory
curl http://localhost:4000/api/doctor/list

# Register a patient
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex Patient","email":"alex@example.com","password":"change-this-password"}'
```

Authenticated routes require the token/header format expected by the corresponding role middleware and frontend context. Review `server/middlewares/` and the relevant client context before writing custom API integrations.

## API route reference

All routes below are mounted beneath the listed prefix.

| Method | Route | Access |
| --- | --- | --- |
| `POST` | `/api/user/register` | Public |
| `POST` | `/api/user/login` | Public |
| `GET` | `/api/user/get-profile` | Patient |
| `POST` | `/api/user/update-profile` | Patient |
| `POST` | `/api/user/book-appointment` | Patient |
| `GET` | `/api/user/appointments` | Patient |
| `POST` | `/api/user/cancel-appointment` | Patient |
| `POST` | `/api/user/payment-razorpay` | Patient |
| `POST` | `/api/user/verifyRazorpay` | Patient |
| `GET` | `/api/doctor/list` | Public |
| `POST` | `/api/doctor/login` | Public |
| `GET` | `/api/doctor/appointments` | Doctor |
| `POST` | `/api/doctor/complete-appointment` | Doctor |
| `POST` | `/api/doctor/cancel-appointment` | Doctor |
| `GET` | `/api/doctor/dashboard` | Doctor |
| `GET` | `/api/doctor/profile` | Doctor |
| `POST` | `/api/doctor/update-profile` | Doctor |
| `POST` | `/api/admin/login` | Public |
| `POST` | `/api/admin/add-doctor` | Admin |
| `POST` | `/api/admin/all-doctors` | Admin |
| `POST` | `/api/admin/change-availability` | Admin |
| `GET` | `/api/admin/appointments` | Admin |
| `POST` | `/api/admin/cancel-appointment` | Admin |
| `GET` | `/api/admin/dashboard` | Admin |

## Build, lint and preview

The frontend packages provide Vite build, ESLint and preview scripts.

```bash
# Patient app
cd clientside
npm run lint
npm run build
npm run preview
```

```bash
# Admin and doctor portal
cd admin
npm run lint
npm run build
npm run preview
```

The backend provides:

```bash
cd server
npm start
```

`npm start` runs the API with Node. `npm run server` runs it with Nodemon for development.

There is currently no production build script for the backend. Deploy it as a Node.js service, configure its environment variables, and point both frontend deployments at its public API URL using `VITE_BACKEND_URL`.

## Deployment

The repository README currently links to a live patient application at [care-axis.vercel.app](https://care-axis.vercel.app/). Treat that as the project's existing demo link. The repository does not include deployment configuration or a verified backend deployment URL.

A typical deployment has three parts:

1. Deploy `server/` to a Node.js hosting provider. Set the production environment variables, MongoDB access, Cloudinary credentials, Razorpay secrets, and allowed frontend origins.
2. Deploy `clientside/` as a Vite static site. Set `VITE_BACKEND_URL` and `VITE_RAZORPAY_KEY_ID` at build time.
3. Deploy `admin/` as a second Vite static site. Set `VITE_BACKEND_URL` and `VITE_CURRENCY` at build time.

Configure the backend CORS allowlist for both deployed frontend origins. Use HTTPS and production credentials. Never put server secrets in frontend environment variables.

## Testing and quality

The checked-in project does not currently contain a test suite. The backend `test` script is a placeholder that exits with an error. The frontend packages expose `lint` scripts but no test scripts.

Before merging changes, run the lint and build commands for both frontends. See the [testing and documentation plan](#known-gaps-and-roadmap) for recommended next steps.

## Contributing

Contributions are welcome. For substantial changes, open an issue first to discuss the approach.

1. Fork the repository and create a focused branch, for example `feat/appointment-reminders` or `fix/doctor-availability`.
2. Keep changes scoped and follow the existing JavaScript/React style.
3. Add or update tests when changing application behavior.
4. Run `npm run lint` and `npm run build` in each frontend package you changed. Run backend tests when a test suite is available.
5. Update documentation and environment examples when configuration or API behavior changes.
6. Open a pull request with a clear summary, motivation, screenshots for UI changes, and test results.

### Code of conduct

Be respectful and constructive. Welcome different perspectives. Focus feedback on the work, avoid harassment or discriminatory behavior, and raise concerns through the repository maintainers. A formal `CODE_OF_CONDUCT.md` is not present in this repository yet. Add one, such as the [Contributor Covenant](https://www.contributor-covenant.org/), before presenting this as a formally adopted policy.

## Known gaps and roadmap

The following items are based on this repository snapshot. Roadmap entries are recommendations, not claims about existing functionality.

### Known gaps

- No automated unit, integration, or end-to-end tests were found.
- The backend `npm test` command is a placeholder and currently exits with an error.
- `CLIENT_URL` is read by the backend CORS setup but is missing from `server/.env.example`.
- No root-level scripts, CI workflow, contribution guide, or formal code of conduct are included.
- Deployment configuration for the API and admin portal is not included in the repository.
- The current API route documentation should be kept in sync with the route files as endpoints evolve.

### Suggested testing and documentation plan

**First pass**
- Add `CLIENT_URL` to `server/.env.example` and document whether the API should accept one or multiple frontend origins.
- Add a backend test runner such as Vitest or Jest with Supertest.
- Cover `/health`, registration/login validation, role-protected routes, appointment booking/cancellation, and payment verification. Mock MongoDB, Cloudinary, and Razorpay in isolated tests.
- Add frontend component tests with Vitest and React Testing Library for login, doctor discovery, booking, and dashboard flows.
- Add one end-to-end smoke test for patient registration through appointment booking using a dedicated test database and payment sandbox.

**Next**
- Add GitHub Actions to install dependencies, run lint, run tests, and build both frontend apps on pull requests.
- Add a root README or scripts for common setup tasks, plus `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
- Document authentication headers, request/response examples, upload constraints, and payment failure cases.
- Add deployment instructions for the actual hosting providers and a backend health-check URL.

### Suggested roadmap

- [ ] Automated backend and frontend tests
- [ ] CI checks for lint, tests, and production builds
- [ ] Complete API reference with request and response schemas
- [ ] Documented multi-origin CORS and deployment setup
- [ ] Formal contribution and code of conduct documents

## License

No `LICENSE` file was found in the repository snapshot. Add a license before redistributing or accepting contributions under explicit reuse terms.

## Maintainer

**Pritam Paul**

- Email: pritampaul.10000@gmail.com
- GitHub: [@pritampaul00](https://github.com/pritampaul00)
