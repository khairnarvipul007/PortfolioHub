# PortfolioHub — Portfolio Management System
## Complete Lab Experiment Documentation

> **Project**: Portfolio Management System (PortfolioHub)
> **Stack**: React (Vite) + Tailwind CSS v3 + Express.js
> **Timeline**: September 9, 2026 → October 15, 2026
> **Workspace**: `c:\FSD\Portfolio project FSD`

---

## Table of Contents

1. [Session 1 — Vite + React + Tailwind CSS Setup (Sept 9)](#session-1--vite--react--tailwind-css-setup-sept-9)
2. [Session 2 — Premium Interactive Event Page (Sept 9)](#session-2--premium-interactive-event-page-sept-9)
3. [Session 3 — Full Frontend with React Router & Auth (Oct 8)](#session-3--full-frontend-with-react-router--auth-oct-8)
4. [Session 4 — Rebranding to Portfolio Management (Oct 8)](#session-4--rebranding-to-portfolio-management-oct-8)
5. [Session 5 — Backend REST API & React-Express Integration (Oct 15)](#session-5--backend-rest-api--react-express-integration-oct-15)
6. [Final Project Structure](#final-project-structure)
7. [Complete Source Code (Current State)](#complete-source-code-current-state)
8. [API Testing Guide (Postman)](#api-testing-guide-postman)
9. [How to Run the Project](#how-to-run-the-project)

---

## Session 1 — Vite + React + Tailwind CSS Setup (Sept 9)

### Objective
Initialize a Vite-based React application configured with Tailwind CSS. Set up the project files to build an Event Page for a Portfolio Management Platform.

### Steps Performed

#### 1.1 Scaffold Vite React Project
```bash
npx -y create-vite@latest ./ --template react --no-interactive
npm install
```
**Output**: Scaffolded project with React template (Vite v8.2.2)

#### 1.2 Install Tailwind CSS v3 with PostCSS
```bash
npm install -D tailwindcss@3 postcss autoprefixer
```
**Note**: Initially installed Tailwind v4 (`tailwindcss@4.3.3` + `@tailwindcss/vite`), but uninstalled and switched to v3 because the lab specification required `tailwind.config.js` + `@tailwind` directives (v3 approach).

```bash
npm uninstall tailwindcss @tailwindcss/vite
npm install -D tailwindcss@3 postcss autoprefixer
```

#### 1.3 Configuration Files Created

**tailwind.config.js**
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**postcss.config.js**
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**src/index.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 1.4 Initial App.jsx — Static Event Cards
Created `src/App.jsx` with 3 hackathon event cards (Loop 1.0 Hackathon, Velora 1.0 Hackathon, Syrus Hackathon) using Tailwind utility classes for grid layouts, typography, borders, shadows, hover effects, and transitions.

#### 1.5 Build & Run
```bash
npm run build
npm run dev
```
**Build Output**: ✓ 16 modules transformed — `index.css` (7.63 KB), `index.js` (193.49 KB)
**Dev Server**: Running at `http://localhost:5173/`

### Key Concepts Demonstrated
- Vite project scaffolding with `create-vite`
- Tailwind CSS v3 configuration (content paths, PostCSS)
- `@tailwind` directives (base, components, utilities)
- Responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Hover effects (`hover:shadow-xl hover:-translate-y-1`)
- Transition animations (`transition duration-300`)

---

## Session 2 — Premium Interactive Event Page (Sept 9)

### Objective
Upgrade the static event page to a premium, highly interactive version with search, filter, and advanced Tailwind CSS features.

### Changes Made

#### 2.1 Replaced App.jsx with Interactive Version
- Expanded from 3 to 6 events (added AWS Summit 2026, React Conf India, Global FinTech Innovators)
- Added `category` field (Hackathon, Conference, Meetup, Competition)
- Added `color` gradient classes per card
- Implemented `useState` for search term and category filter
- Added filter logic with `.filter()` combining search + category matching

#### 2.2 New Features Implemented
| Feature | Implementation |
|---------|---------------|
| Search Bar | `useState` + `onChange` + `.toLowerCase().includes()` |
| Category Filter | Pill buttons with active state styling |
| Gradient Card Headers | `bg-gradient-to-r ${event.color}` |
| SVG Icons | Calendar and Location icons inline |
| Empty State | Shown when no events match search/filter |
| Status Badges | Conditional colors (green for completed, blue for upcoming, etc.) |

#### 2.3 Advanced Tailwind Classes Used
- Gradients: `bg-gradient-to-r from-blue-500 to-indigo-600`
- Ring borders: `ring-2 ring-blue-500`
- Backdrop blur: `backdrop-blur-sm`
- Transitions: `transition-all duration-200`
- Focus states: `focus:ring-4 focus:ring-blue-100`

#### 2.4 Build Result
```
✓ 35 modules transformed
dist/assets/index.css    9.30 KB
dist/assets/index.js   197.00 KB
```

### Key Concepts Demonstrated
- React `useState` hook for state management
- Controlled inputs (search bar)
- Array `.filter()` with multiple conditions
- Conditional rendering (ternary operators)
- Dynamic className construction

---

## Session 3 — Full Frontend with React Router & Auth (Oct 8)

### Objective
Transform the single-page app into a multi-page application with routing, authentication context, and a complete component architecture.

### Steps Performed

#### 3.1 Install React Router
```bash
npm install react-router-dom
```

#### 3.2 Component Architecture Created

```
src/
├── components/
│   ├── Navbar.jsx        ← Responsive nav with useAuth, mobile menu
│   ├── EventCard.jsx     ← Props-based card with useState registration
│   ├── Loading.jsx       ← Spinner with animate-spin
│   ├── Button.jsx        ← Reusable button component
│   └── Modal.jsx         ← Reusable modal component
├── context/
│   └── AuthContext.jsx   ← createContext, AuthProvider, localStorage
├── hooks/
│   └── useAuth.js        ← Custom hook wrapping useContext
├── pages/
│   ├── Home.jsx          ← Hero + Introduction sections
│   ├── Events.jsx        ← Event listing with useEffect + Loading
│   ├── Login.jsx         ← Form with useAuth + useNavigate
│   ├── Register.jsx      ← Form with validation
│   ├── MyRegistrations.jsx ← Auth-aware display
│   └── AdminDashboard.jsx  ← Placeholder
├── services/
│   └── api.js            ← API service placeholder
├── App.jsx               ← BrowserRouter + 6 Routes
├── main.jsx              ← AuthProvider wrapping App
└── index.css             ← Tailwind directives
```

#### 3.3 Routing Configuration (App.jsx)
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `<Home />` | Hero + Introduction |
| `/events` | `<Events />` | Event listing |
| `/login` | `<Login />` | Login form |
| `/register` | `<Register />` | Registration form |
| `/my-registrations` | `<MyRegistrations />` | User's events |
| `/admin` | `<AdminDashboard />` | Admin placeholder |

#### 3.4 Authentication System
**AuthContext** provides:
- `user` state (null when logged out)
- `login(email)` — creates user object, saves to `localStorage`
- `logout()` — clears user state and `localStorage`

**Flow**: `AuthProvider` → wraps `<App />` in `main.jsx` → any component calls `useAuth()` to access `{ user, login, logout }`

#### 3.5 Backend Folder Structure Created
```bash
# Inside server/
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken socket.io
npm install -D nodemon
```

Created server scaffold with:
- Models: `User.js` (bcrypt password hashing), `Event.js`, `Registration.js`
- Controllers: `authController.js` (register/login + JWT), `eventController.js` (CRUD)
- Middleware: `authMiddleware.js` (JWT protect + admin guard), `errorMiddleware.js`
- Routes: `authRoutes.js`, `eventRoutes.js`, `registrationRoutes.js`
- Utils: `generateToken.js` (JWT sign, 30-day expiry)

### Key Concepts Demonstrated
- React Router v6 (`BrowserRouter`, `Routes`, `Route`)
- Context API (`createContext`, `useContext`, Provider pattern)
- Custom hooks (`useAuth`)
- `useNavigate` for programmatic navigation
- `useEffect` for side effects (data loading)
- `localStorage` for session persistence
- Responsive navigation (hamburger menu with useState toggle)
- Form handling with controlled components
- Conditional rendering based on auth state

---

## Session 4 — Rebranding to Portfolio Management (Oct 8)

### Objective
Rebrand the entire project from "EventHub" / "Event Management" to "PortfolioHub" / "Portfolio Management" since the project is a Portfolio Management System that uses event management logic.

### Changes Made

| What Changed | Before | After |
|---|---|---|
| Navbar brand | EventHub | **PortfolioHub** |
| Browser tab title | portfolio-project-fsd | **PortfolioHub - Portfolio Management System** |
| Home hero heading | "Discover Amazing Events" | **"Build Your Professional Portfolio"** |
| Home CTA button | "Explore Events" | **"Explore Portfolio"** |
| Home section heading | "Find Your Next Experience" | **"Your Achievements, One Platform"** |
| Events page heading | "Upcoming Events" | **"Portfolio Events & Milestones"** |
| Login description | "manage your event registrations" | **"manage your portfolio"** |
| Register description | "start exploring events" | **"start building your portfolio"** |
| MyRegistrations heading | "My Registrations" | **"My Portfolio Events"** |
| AdminDashboard heading | "Manage events..." | **"Portfolio Admin Dashboard"** |
| Loading text | "Loading events..." | **"Loading portfolio..."** |
| localStorage key | `eventHubUser` | **`portfolioHubUser`** |
| Server package name | event-management-server | **portfolio-management-server** |
| MongoDB database | eventmanagement | **portfoliomanagement** |

### Key Takeaway
The architecture and logic remain identical to an Event Management System — the difference is purely in branding and content. This demonstrates how a well-structured codebase can be easily adapted for different domains.

---

## Session 5 — Backend REST API & React-Express Integration (Oct 15)

### Objective
Set up Express backend with in-memory CRUD operations and connect the React frontend to fetch data from the API instead of using hardcoded arrays.

### Architecture
```
React Frontend (localhost:5173)
    ↓ fetch("/api/events")
Vite Proxy (vite.config.js)
    ↓ forwards /api → http://localhost:5000
Express Backend (localhost:5000)
    ↓
eventRoutes → eventController
    ↓
JSON Response → rendered by EventCard
```

### Steps Performed

#### 5.1 Simplified server.js
Replaced the Mongoose-based server with a simple Express setup (no database, in-memory data):

```js
const express = require("express");
const app = express();
const eventRoutes = require("./routes/eventRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Portfolio Management API Running");
});

app.use("/api/events", eventRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

#### 5.2 Event Controller — In-Memory CRUD
Created `server/controllers/eventController.js` with full REST operations using an in-memory array:

| Function | Route | Description |
|----------|-------|-------------|
| `getEvents` | `GET /api/events` | Returns all events |
| `getEventById` | `GET /api/events/:id` | Returns single event |
| `createEvent` | `POST /api/events` | Creates event (with validation) |
| `updateEvent` | `PUT /api/events/:id` | Updates event (with validation) |
| `deleteEvent` | `DELETE /api/events/:id` | Deletes event |

Initial seed data:
```js
let events = [
  { id: 1, title: "Tech Fest 2026", description: "A technology event for students.", date: "2026-11-15", time: "10:00", location: "Mumbai" },
  { id: 2, title: "React Workshop", description: "Learn React from basics to advanced.", date: "2026-11-20", time: "14:00", location: "Pune" },
  { id: 3, title: "AI Conference", description: "Explore the latest AI developments.", date: "2026-11-25", time: "09:30", location: "Bengaluru" },
];
```

#### 5.3 Event Routes
```js
router.get("/", getEvents);           // GET all events
router.get("/:id", getEventById);     // GET one event
router.post("/", createEvent);         // CREATE an event
router.put("/:id", updateEvent);       // UPDATE an event
router.delete("/:id", deleteEvent);    // DELETE an event
```

#### 5.4 Vite Proxy Configuration
Added to `vite.config.js`:
```js
server: {
  proxy: {
    "/api": "http://localhost:5000",
  },
},
```
This forwards all `/api` requests from the frontend dev server to the Express backend.

#### 5.5 API Service (Frontend)
Created `src/services/api.js`:
```js
export async function getEvents() {
  const response = await fetch("/api/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
}
```

#### 5.6 Updated Events.jsx — Fetch from API
Changed from hardcoded `eventData` array to fetching from Express API:
- Uses `async/await` with `try/catch/finally`
- Three states: `loading`, `error`, `events`
- Handles: loading spinner, error message, empty state, event grid

#### 5.7 Updated EventCard.jsx — Added Time Prop
Added `time` prop to component destructuring and displays it between Date and Location.

#### 5.8 Running Both Servers
```bash
# Terminal 1 — Backend
cd server
npm run dev    # nodemon server.js → http://localhost:5000

# Terminal 2 — Frontend
npm run dev    # vite → http://localhost:5173
```

#### 5.9 API Verification
```
GET http://localhost:5000/           → "Portfolio Management API Running"
GET http://localhost:5000/api/events → [3 events as JSON array]
GET http://localhost:5000/api/events/1 → {Tech Fest 2026 event}
```

### Key Concepts Demonstrated
- Express.js server setup (`express()`, `app.use()`, `app.listen()`)
- RESTful API design (GET, POST, PUT, DELETE)
- Middleware (`express.json()` for parsing request bodies)
- Route-Controller separation pattern
- Input validation with `.trim()` and optional chaining
- Auto-incrementing IDs (`Math.max(...ids) + 1`)
- Vite dev server proxy for CORS-free development
- `fetch()` API with error handling
- React state management for async data (loading/error/data pattern)

---

## Final Project Structure

```
Portfolio project FSD/
│
├── src/                              ← FRONTEND (React + Vite + Tailwind)
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Button.jsx                ← Reusable button
│   │   ├── EventCard.jsx             ← Card with title, desc, date, time, location
│   │   ├── Loading.jsx               ← Spinner component
│   │   ├── Modal.jsx                 ← Reusable modal
│   │   └── Navbar.jsx                ← Responsive nav with auth state
│   ├── context/
│   │   └── AuthContext.jsx           ← createContext + AuthProvider
│   ├── hooks/
│   │   └── useAuth.js                ← Custom hook for auth
│   ├── pages/
│   │   ├── AdminDashboard.jsx        ← Admin placeholder
│   │   ├── Events.jsx                ← Fetches from Express API
│   │   ├── Home.jsx                  ← Hero + Intro
│   │   ├── Login.jsx                 ← Login form + redirect
│   │   ├── MyRegistrations.jsx       ← User's portfolio events
│   │   └── Register.jsx              ← Registration form
│   ├── services/
│   │   └── api.js                    ← fetch("/api/events")
│   ├── App.jsx                       ← BrowserRouter + 6 Routes
│   ├── index.css                     ← Tailwind directives
│   └── main.jsx                      ← AuthProvider wrapper
│
├── server/                           ← BACKEND (Express)
│   ├── config/
│   │   └── db.js                     ← MongoDB connection (for future use)
│   ├── controllers/
│   │   ├── authController.js         ← Register + Login (JWT)
│   │   └── eventController.js        ← In-memory CRUD (current)
│   ├── middleware/
│   │   ├── authMiddleware.js         ← JWT protect + admin guard
│   │   └── errorMiddleware.js        ← Global error handler
│   ├── models/
│   │   ├── Event.js                  ← Mongoose event schema
│   │   ├── Registration.js           ← User ↔ Event link
│   │   └── User.js                   ← User schema with bcrypt
│   ├── routes/
│   │   ├── authRoutes.js             ← POST /register, /login
│   │   ├── eventRoutes.js            ← Full REST CRUD
│   │   └── registrationRoutes.js     ← Event registration routes
│   ├── utils/
│   │   └── generateToken.js          ← JWT sign utility
│   ├── .env                          ← Environment variables
│   ├── .gitignore                    ← node_modules, .env
│   ├── package.json                  ← Server dependencies
│   └── server.js                     ← Express entry point
│
├── index.html                        ← HTML entry point
├── vite.config.js                    ← Vite config + API proxy
├── tailwind.config.js                ← Tailwind v3 config
├── postcss.config.js                 ← PostCSS plugins
└── package.json                      ← Frontend dependencies
```

---

## Complete Source Code (Current State)

### Frontend Core Files

#### `src/main.jsx`
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

#### `src/App.jsx`
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyRegistrations from "./pages/MyRegistrations";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

#### `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

nav h1 { color: #fff; margin: 0; }
```

#### `vite.config.js`
```js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
})
```

---

### Context & Hooks

#### `src/context/AuthContext.jsx`
```jsx
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("portfolioHubUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(email) {
    const loggedInUser = {
      name: email.split("@")[0],
      email: email,
    };
    setUser(loggedInUser);
    localStorage.setItem("portfolioHubUser", JSON.stringify(loggedInUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("portfolioHubUser");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
```

#### `src/hooks/useAuth.js`
```js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
```

#### `src/services/api.js`
```js
export async function getEvents() {
  const response = await fetch("/api/events");

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}
```

---

### Components

#### `src/components/Navbar.jsx`
```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
  }

  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={closeMenu} className="text-2xl font-bold">
          PortfolioHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="transition hover:text-indigo-400">Home</Link>
          <Link to="/events" className="transition hover:text-indigo-400">Events</Link>

          {user ? (
            <>
              <Link to="/my-registrations" className="transition hover:text-indigo-400">
                My Registrations
              </Link>
              <span className="text-sm text-slate-300">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-4 py-2 transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="transition hover:text-indigo-400">Login</Link>
              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold transition hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-slate-600 px-3 py-2 md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-slate-700 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/events" onClick={closeMenu}>Events</Link>
            {user ? (
              <>
                <Link to="/my-registrations" onClick={closeMenu}>My Registrations</Link>
                <p className="text-sm text-slate-300">Logged in as {user.name}</p>
                <button onClick={handleLogout} className="rounded-lg bg-red-600 px-4 py-2 text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>Login</Link>
                <Link to="/register" onClick={closeMenu}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
```

#### `src/components/EventCard.jsx`
```jsx
import { useState } from "react";

function EventCard({ title, description, date, time, location }) {
  const [registered, setRegistered] = useState(false);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-slate-600">{description}</p>
      <p className="mt-3 text-slate-600">Date: {date}</p>
      <p className="text-slate-600">Time: {time}</p>
      <p className="text-slate-600">Location: {location}</p>

      {registered ? (
        <p className="mt-4 font-semibold text-green-600">Successfully Registered!</p>
      ) : (
        <button
          onClick={() => setRegistered(true)}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
        >
          Register
        </button>
      )}
    </div>
  );
}

export default EventCard;
```

#### `src/components/Loading.jsx`
```jsx
function Loading() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600"></div>
        <p className="font-medium text-slate-600">Loading portfolio...</p>
      </div>
    </div>
  );
}

export default Loading;
```

---

### Pages

#### `src/pages/Home.jsx`
```jsx
function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-slate-100 px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-slate-900 md:text-6xl">
          Build Your Professional Portfolio
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Showcase your hackathons, conferences, and technical milestones.
          Track your professional journey all in one place.
        </p>
        <button className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
          Explore Portfolio
        </button>
      </section>

      <section className="bg-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Your Achievements, One Platform</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Manage your hackathon wins, conference appearances, competition results,
          and professional event history with a clean, modern portfolio system.
        </p>
      </section>
    </div>
  );
}

export default Home;
```

#### `src/pages/Events.jsx`
```jsx
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { getEvents } from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message || "Unable to load events");
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">Portfolio Events & Milestones</h1>
        <p className="mt-2 text-slate-600">
          Browse your hackathons, conferences, and professional events that shape your portfolio.
        </p>

        {loading && <Loading />}
        {!loading && error && <p className="mt-6 text-red-600">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="mt-6 text-slate-600">No events are available.</p>
        )}
        {!loading && !error && events.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                time={event.time}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
```

#### `src/pages/Login.jsx`
```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("Please fill in all fields.");
      return;
    }
    login(formData.email);
    setMessage("Login successful!");
    setTimeout(() => { navigate("/"); }, 500);
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-slate-900">Login</h1>
        <p className="mt-2 text-slate-600">Login to manage your portfolio.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="mb-1 block font-medium">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Login
          </button>
          {message && <p className="text-center font-semibold text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
```

#### `src/pages/Register.jsx`
```jsx
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    setMessage("Registration successful!");
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-2 text-slate-600">Register to start building your portfolio.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block font-medium">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="mb-1 block font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="mb-1 block font-medium">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Register
          </button>
          {message && <p className="mt-4 text-center font-semibold text-indigo-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
```

#### `src/pages/MyRegistrations.jsx`
```jsx
import useAuth from "../hooks/useAuth";

function MyRegistrations() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">My Portfolio Events</h1>
        {user ? (
          <p className="mt-4 text-slate-600">
            Welcome, <span className="font-semibold">{user.name}</span>.
            Your registered portfolio events will appear here.
          </p>
        ) : (
          <p className="mt-4 text-red-600">Please login to view your portfolio events.</p>
        )}
      </div>
    </div>
  );
}

export default MyRegistrations;
```

#### `src/pages/AdminDashboard.jsx`
```jsx
function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">Portfolio Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Manage portfolio events, milestones, and user registrations.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
```

---

### Backend Files

#### `server/server.js`
```js
const express = require("express");
const app = express();
const eventRoutes = require("./routes/eventRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Portfolio Management API Running");
});

app.use("/api/events", eventRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

#### `server/controllers/eventController.js`
```js
let events = [
  { id: 1, title: "Tech Fest 2026", description: "A technology event for students.", date: "2026-11-15", time: "10:00", location: "Mumbai" },
  { id: 2, title: "React Workshop", description: "Learn React from basics to advanced.", date: "2026-11-20", time: "14:00", location: "Pune" },
  { id: 3, title: "AI Conference", description: "Explore the latest AI developments.", date: "2026-11-25", time: "09:30", location: "Bengaluru" },
];

// GET /api/events
function getEvents(req, res) {
  res.status(200).json(events);
}

// GET /api/events/:id
function getEventById(req, res) {
  const id = Number(req.params.id);
  const event = events.find((event) => event.id === id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.status(200).json(event);
}

// POST /api/events
function createEvent(req, res) {
  const { title, description, date, time, location } = req.body;
  if (!title?.trim() || !description?.trim() || !date?.trim() || !time?.trim() || !location?.trim()) {
    return res.status(400).json({ message: "All event fields are required" });
  }
  const newEvent = {
    id: events.length ? Math.max(...events.map((event) => event.id)) + 1 : 1,
    title: title.trim(), description: description.trim(),
    date: date.trim(), time: time.trim(), location: location.trim(),
  };
  events.push(newEvent);
  res.status(201).json({ message: "Event created successfully", event: newEvent });
}

// PUT /api/events/:id
function updateEvent(req, res) {
  const id = Number(req.params.id);
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }
  const { title, description, date, time, location } = req.body;
  if (!title?.trim() || !description?.trim() || !date?.trim() || !time?.trim() || !location?.trim()) {
    return res.status(400).json({ message: "All event fields are required" });
  }
  events[index] = { id, title: title.trim(), description: description.trim(),
    date: date.trim(), time: time.trim(), location: location.trim() };
  res.status(200).json({ message: "Event updated successfully", event: events[index] });
}

// DELETE /api/events/:id
function deleteEvent(req, res) {
  const id = Number(req.params.id);
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }
  const deletedEvent = events[index];
  events = events.filter((event) => event.id !== id);
  res.status(200).json({ message: "Event deleted successfully", event: deletedEvent });
}

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
```

#### `server/routes/eventRoutes.js`
```js
const express = require("express");
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
```

#### `server/package.json`
```json
{
  "name": "portfolio-management-server",
  "version": "1.0.0",
  "description": "Backend server for Portfolio Management System",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## API Testing Guide (Postman)

### 1. GET all events
- **Method**: GET
- **URL**: `http://localhost:5000/api/events`
- **Expected**: `200 OK` — JSON array of 3 events

### 2. GET one event
- **Method**: GET
- **URL**: `http://localhost:5000/api/events/1`
- **Expected**: `200 OK` — Tech Fest 2026 event object

### 3. CREATE an event
- **Method**: POST
- **URL**: `http://localhost:5000/api/events`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "title": "Cloud Summit 2026",
  "description": "Cloud computing and DevOps conference.",
  "date": "2026-12-01",
  "time": "09:00",
  "location": "Hyderabad"
}
```
- **Expected**: `201 Created` with new event (id: 4)

### 4. UPDATE an event
- **Method**: PUT
- **URL**: `http://localhost:5000/api/events/1`
- **Body** (raw JSON):
```json
{
  "title": "Tech Fest 2026 - Updated",
  "description": "Updated technology event description.",
  "date": "2026-11-15",
  "time": "11:00",
  "location": "Mumbai"
}
```
- **Expected**: `200 OK` with updated event

### 5. DELETE an event
- **Method**: DELETE
- **URL**: `http://localhost:5000/api/events/1`
- **Expected**: `200 OK` — `{ "message": "Event deleted successfully", "event": {...} }`

---

## How to Run the Project

### Prerequisites
- Node.js (v18+)
- npm

### Start Backend (Terminal 1)
```bash
cd "c:\FSD\Portfolio project FSD\server"
npm install
npm run dev
```
Server starts at: **http://localhost:5000**

### Start Frontend (Terminal 2)
```bash
cd "c:\FSD\Portfolio project FSD"
npm install
npm run dev
```
Frontend starts at: **http://localhost:5173**

### Build for Production
```bash
cd "c:\FSD\Portfolio project FSD"
npm run build
```
Output: `dist/` folder

---

## Summary of React Concepts Used

| Concept | Where Used |
|---------|-----------|
| `useState` | Login, Register, Events, EventCard, Navbar |
| `useEffect` | Events (data fetching) |
| `useContext` | useAuth hook → AuthContext |
| `createContext` | AuthContext.jsx |
| Custom Hooks | useAuth.js |
| React Router v6 | App.jsx (BrowserRouter, Routes, Route) |
| `useNavigate` | Login.jsx (redirect after login) |
| `Link` | Navbar.jsx (client-side navigation) |
| Controlled Components | Login, Register (form inputs) |
| Conditional Rendering | Navbar (auth state), Events (loading/error/data) |
| Props | EventCard (title, description, date, time, location) |
| `localStorage` | AuthContext (session persistence) |
| `fetch()` API | api.js → Events.jsx |
| `async/await` | Events.jsx (loadEvents function) |

## Summary of Express Concepts Used

| Concept | Where Used |
|---------|-----------|
| Express App | server.js (`express()`, `app.listen()`) |
| Middleware | `express.json()` for parsing request bodies |
| Routing | eventRoutes.js (`router.get`, `.post`, `.put`, `.delete`) |
| Route Parameters | `req.params.id` |
| Request Body | `req.body` |
| Status Codes | 200, 201, 400, 404 |
| MVC Pattern | Routes → Controllers → Response |
| nodemon | Auto-restart on file changes |

---

*Document generated on October 22, 2026*
