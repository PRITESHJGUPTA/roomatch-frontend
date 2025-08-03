# 💘 RoomMatch

RoomMatch is a live, event-based dating & social matching platform that allows participants to join a room, answer dynamic topical questions, and get matched based on compatibility and preferences — all in real time.

## 🔗 Live Demo

🌐 Frontend: [roommatch-frontend.vercel.app](https://roommatch-frontend-u.vercel.app)  
🚀 Backend: [roommatch-backend.onrender.com](https://roommatch-backend.onrender.com)

---

## ✨ Features

- 🎯 Create or join a room with a unique 6-character code
- 🧑‍🤝‍🧑 Users choose their gender and who they want to match with
- 🧠 Answer a fresh, dynamic set of questions (1–10 scale)
- 🔁 Matchmaking algorithm calculates compatibility scores
- ⏱ Countdown-based synchronized reveal screen
- 🔐 Match data is cleaned up after reveal to maintain privacy
- 🌍 Fully deployed on Vercel (frontend) + Render (backend)

---


## 🧩 Tech Stack

**Frontend**
- React + Vite
- Axios for API calls
- Vanilla CSS (custom styling)

**Backend**
- Node.js + Express
- CORS config for live deployments
- UUID for user sessions
- In-memory session store (no DB needed)

**Deployment**
- 🔄 Render (Node.js backend)
- ⚡ Vercel (React frontend)

---

## 🚀 How to Run Locally

### Backend (Render-ready)

```bash
cd roommatch-backend
npm install
npm start
