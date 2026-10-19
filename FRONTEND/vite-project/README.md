# SalesCore CRM — Frontend Client

React 19 + Vite 8 frontend for SalesCore Enterprise CRM.

---

## 👥 Demo & Test Accounts (For Vercel Testers)

| Role | Email | Password | Primary Dashboard |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@salescore.com` | `password123` | `/start/admin-dashbourd` |
| **Team Leader** | `teamleader@salescore.com` | `password123` | `/start/TeamLeader` |
| **Sales Agent** | `agent@salescore.com` | `password123` | `/start/agent-dashbourd` |
| **Data Entry** | `dataentry@salescore.com` | `password123` | `/AddeLead` |

---

## ⚙️ Environment Configuration

Add the following environment variables in **Vercel Project Settings > Environment Variables**:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base API URL of your backend | `https://your-backend.onrender.com/api` |
| `VITE_SOCKET_URL` | WebSocket server URL for real-time notifications | `https://your-backend.onrender.com` |

---

## 🚀 Scripts

* `npm run dev`: Start local development server on `http://localhost:5173`.
* `npm run build`: Production bundle compilation with Vite.
* `npm test`: Run store and route sanity test suite.
