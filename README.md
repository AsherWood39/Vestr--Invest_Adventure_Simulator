# Vestr: Invest Adventure Simulator 🚀

A web-based gamified investment simulator that guides users through branching financial adventures. Earn XP and unlock milestone badges by mastering concepts like diversification, compound interest, and portfolio strategy — transformed into engaging quests tailored for women building financial confidence.

---

## 🏗 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vite + React 19 + TypeScript |
| **Styling** | Tailwind CSS + Framer Motion |
| **Backend** | Django 4.2 + Django REST Framework |
| **Database** | SQLite (Local) / PostgreSQL (Production) |
| **Deployment** | Render (Backend) + Vercel (Frontend) |

---

## ✅ Features Implemented

### Authentication & Onboarding
- **Multi-step Onboarding Flow** — New users pick a username, password, avatar persona *(Professional Clara / Student Maya)*, experience level, and financial goal, all saved via the `/register/` API endpoint.
- **Login Modal** — Returning users log in with username & password via the `/login/` API endpoint.
- **Modal Navigation** — "Start Expedition" in the Login modal seamlessly transitions to the Onboarding modal.

### Navigation & Layout
- **Sticky Navigation Bar** — Vestr logo, Explore, Profile, Logout, and XP indicator.
- **XP Indicator** — Displays current XP in the header; disabled and greyed out when XP is 0.
- **View Routing** — Client-side routing between `home`, `explore`, `quiz`, and `profile` views.

### Explore Page
- **Live Scenario Fetching** — Adventures fetched dynamically from the Django API (`/scenarios/list/`).
- **Three Archetypes** — Niya *(Stable)*, Rachel *(Strategic)*, Tina *(Dynamic)*, each with unique artwork, tags, gradient, and description.
- **Embark Flow** — Clicking a scenario card allows users to start their investment adventure.

### 🎮 Interactive Quiz Engine (New!)
- **Simulation Challenges** — Real-time branching questions tailored to each scenario (Niya, Rachel, or Tina).
- **Gamified Feedback** — Instant "correct/incorrect" visual cues with Framer Motion animations.
- **permanent XP Persistence** — Registered users automatically save their earned XP to the backend on completion.
- **Guest mode** — Logged-out users can still take quizzes with a warning that results won't be saved.
- **Reward summary** — Dynamic "Quest Complete" screen with trophy icon and XP summary.

### Profile Page
- **Live Profile Data** — Username, avatar, and goal fetched from the backend API.
- **Scenarios Completed** — Displays thumbnails for all `SOLVED` scenarios; shows placeholder if none.
- **XP-Based Badge System** — One milestone badge per 100 XP earned:
  - XP < 100 → *"No badges received yet."*
  - 100 XP → 🏅 100 XP badge
  - 200 XP → 🏅 100 XP + 🏅 200 XP badges
  - *…scales automatically with any XP value*

### Backend API
- **Users App** — `UserProfile` model; `/register/`, `/login/`, and `/add_xp/` endpoints.
- **Scenarios App** — `Scenario` and `UserScenarioProgress` models; `/scenarios/list/` and `/scenarios/progress/` endpoints.
- **Quizzes App** — `QuizQuestion` and `QuizOption` models; dynamic fetching via scenario ID.
- **CORS** — Configured via `django-cors-headers` for local and production origins.
- **Production Ready** — `whitenoise` for static files, `gunicorn` for serving on Render.

---

## 🚀 Getting Started

### 1. Backend Setup (Django)
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
> API available at `http://127.0.0.1:8000/api/`

### 2. Frontend Setup (React)
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

```bash
npm run dev
```
> App available at `http://localhost:5173/`

---

## 📁 Project Structure

```
Vestr--Invest_Adventure_Simulator/
├── backend/
│   ├── core/               # Django settings and root URLs
│   ├── users/              # UserProfile model, registration, login & XP update API
│   ├── scenarios/          # Scenario model, progress tracking API
│   ├── quizzes/            # QuizQuestion/Option models and API
│   ├── requirements.txt
│   └── manage.py
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── apiClient.ts        # Centralized fetch utility with env-based base URL
    │   ├── assets/                 # SVG character illustrations (Niya, Rachel, Tina, etc.)
    │   ├── components/
    │   │   ├── LoginModal.tsx      # Login form with modal transition to onboarding
    │   │   └── OnboardingModal.tsx # 4-step new user registration flow
    │   ├── pages/
    │   │   ├── Explore.tsx         # Live adventure listing page
    │   │   ├── Quiz.tsx            # NEW: Interactive quiz/simulation page
    │   │   └── Profile.tsx         # User profile with XP badges & scenario history
    │   ├── types/                  # TypeScript interfaces (UserProfile, Scenario, etc.)
    │   ├── App.tsx                 # Root layout, navigation, modal state management
    │   └── main.tsx
    ├── .env                        # VITE_API_URL (not committed)
    └── vite.config.ts
```

---

## 🔮 Roadmap

- [x] Quiz engine — branching question/answer flows within each scenario
- [x] XP awarded on quiz completion
- [x] Permanent XP persistence in the database
- [ ] Session / JWT authentication polish
- [ ] Leaderboard
- [ ] Mobile-responsive polish
