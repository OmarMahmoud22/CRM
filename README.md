# SalesCore CRM — Enterprise Full-Stack Platform

SalesCore CRM is a modern, full-stack Customer Relationship Management and sales pipeline orchestration platform built with **Node.js, Express, MongoDB, Socket.IO, React 19, Redux Toolkit, and Tailwind CSS**.

---

## 🚀 Live Demo & Test Credentials (Vercel & Testing Guide)

Anyone testing the deployed application on **Vercel** or locally can log in using the pre-seeded credentials below to test each specific role and permission level:

| Role | Email | Password | Primary Dashboard & Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@salescore.com` | `password123` | **Executive Dashboard** (`/start/admin-dashbourd`)<br>• System-wide metrics (Total Users, Leads, Won Deals, Pipeline)<br>• Team Directory (`/start/allUsers`)<br>• Register New Users with Roles (`/register`)<br>• View and manage all company leads |
| **Team Leader** | `teamleader@salescore.com` | `password123` | **Lead Distribution Board** (`/start/TeamLeader`)<br>• View all incoming leads<br>• Assign leads to sales agents in real time<br>• Change lead pipeline status directly from the table (`PATCH /api/LeadS/:id`)<br>• Real-time notifications sent to agents |
| **Sales Agent** | `agent@salescore.com` | `password123` | **Agent Workspace** (`/start/agent-dashbourd`)<br>• Personal pipeline statistics & channel metrics<br>• Filter assigned leads by status (`New`, `Contacted`, `Interested`, `Follow_Up`, `Won`, `Lost`)<br>• Update lead status with live feedback (`/start/infoLead/:id`)<br>• Actionable Tasks & Follow-up board (`/start/tasks`)<br>• Real-time push notifications bell & dropdown |
| **Data Entry** | `dataentry@salescore.com` | `password123` | **Lead Intake Portal** (`/AddeLead`)<br>• Dedicated, secure lead creation form<br>• Tag prospects by acquisition channel (Facebook, Instagram, Twitter, Friend referral)<br>• Direct database insertion |

---

## 🎯 Role-Based Testing Scenarios

### Scenario 1: Lead Intake & Assignment Flow
1. Log in as **Data Entry** (`dataentry@salescore.com` / `password123`).
2. Add a new prospect (e.g. `TechCorp`, `+1 555-0199`, `contact@techcorp.com`, `Facebook`).
3. Log out and log in as **Team Leader** (`teamleader@salescore.com` / `password123`).
4. On `/start/TeamLeader`, locate the new lead in the table.
5. Select an agent (e.g. `Alex Sales Agent`) and click **Assign**.
6. Notice the status change or change the status directly using the status dropdown.
7. Log in as **Sales Agent** (`agent@salescore.com` / `password123`):
   * Notice the real-time notification alert in the top navigation bell.
   * View the newly assigned lead in `/start/AllLead` and `/start/tasks`.

### Scenario 2: Agent Status Progress & Conversion
1. Log in as **Sales Agent** (`agent@salescore.com` / `password123`).
2. Go to **Leads** (`/start/AllLead`) or **Tasks** (`/start/tasks`).
3. Click the 👁️ icon to view the lead profile (`/start/infoLead/:id`).
4. Change the status from `New` $\rightarrow$ `Contacted` $\rightarrow$ `Interested` $\rightarrow$ `Won`.
5. Return to **Dashboard** (`/start/agent-dashbourd`) to see your Won metrics increase.

### Scenario 3: Admin System Overview & User Registration
1. Log in as **Admin** (`admin@salescore.com` / `password123`).
2. Explore executive KPIs on `/start/admin-dashbourd`.
3. Go to **Users** (`/start/allUsers`) to view all team members and their roles.
4. Click **Add New User** or visit `/register` to create a new team member with any role (`admin`, `TeamLeader`, `agent`, `Dataentry`).

---

## 🛠️ Tech Stack & Architecture

* **Frontend:**
  * **Framework:** React 19 + Vite 8
  * **State Management:** Redux Toolkit (`authSlice`, `leadSlice`, `usersSlice`)
  * **Routing:** React Router DOM v7 with `RollRoutes` route guards
  * **Styling:** Tailwind CSS v4, FontAwesome Free, React Icons
  * **Real-time Client:** Socket.IO Client
* **Backend:**
  * **Server:** Node.js (v24) + Express.js
  * **Database:** MongoDB with Mongoose ODM
  * **WebSockets:** Socket.IO
  * **Authentication:** JWT (JSON Web Tokens) + bcryptjs password hashing
  * **Validation:** Joi schema validation

---

## 🌐 Environment Variables

### Backend (`BACKEND/.env`):
```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/CRM
SECRETKEY=crm_jwt_super_secret_key_2026_salescore
NODE_ENV=dev
```

### Frontend (`FRONTEND/vite-project/.env`):
```env
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```
> **For Vercel deployment:** Set `VITE_API_URL` to your deployed backend URL (e.g. `https://your-backend.onrender.com/api`) and `VITE_SOCKET_URL` to your WebSocket server.

---

## 💻 Local Setup & Execution

### 1. Install Dependencies
```bash
# Backend
cd BACKEND
npm install

# Frontend
cd ../FRONTEND/vite-project
npm install
```

### 2. Seed Database with Test Accounts & Leads
```bash
cd BACKEND
npm run seed
```

### 3. Start Backend Server
```bash
cd BACKEND
npm start
# Server runs on http://localhost:4000
```

### 4. Start Frontend Development Server
```bash
cd FRONTEND/vite-project
npm run dev
# App runs on http://localhost:5173
```

### 5. Run Automated Tests
```bash
# Backend tests (14 automated tests covering all roles & endpoints)
cd BACKEND
npm test

# Frontend sanity tests
cd ../FRONTEND/vite-project
npm test
```

### 6. Run Production Build
```bash
cd FRONTEND/vite-project
npm run build
```

---

## 📡 Key API Endpoints Reference

| Method | Endpoint | Description | Clearance |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/login` | User login & JWT issuance | Public |
| `POST` | `/api/register` | Create user account | `admin`, `SuperAdmin` |
| `POST` | `/api/Lead` | Create new prospect | `Dataentry`, `admin` |
| `GET` | `/api/AllLead` | Get leads (filtered for agents) | `agent`, `TeamLeader`, `admin` |
| `GET` | `/api/lead/:id` | Lead details | `agent`, `TeamLeader`, `admin` |
| `PATCH` | `/api/Lead/:id` | Assign lead to agent | `TeamLeader`, `admin` |
| `PATCH` | `/api/LeadS/:id` | Update lead pipeline status | `agent`, `TeamLeader`, `admin` |
| `GET` | `/api/lead/filter` | Filter leads by status query | `agent`, `TeamLeader`, `admin` |
| `GET` | `/api/dashboard` | Agent performance metrics | `agent`, `admin` |
| `GET` | `/api/dashbourd_admin/stats` | Executive KPI analytics | `admin`, `SuperAdmin` |
| `GET` | `/api/dashbourd_admin/allusers` | Team member directory | `admin`, `TeamLeader` |
| `GET` | `/api/noti` | User notifications list | Authenticated |
| `PATCH` | `/api/noti/:id` | Mark notification as read | Authenticated |

