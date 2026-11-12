import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-100 px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-slate-900 md:text-6xl">
          Build Your Professional Portfolio
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Showcase your hackathons, conferences, and technical milestones.
          Track your professional journey and live updates all in one place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/events"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Explore Portfolio
          </Link>
          {!user && (
            <Link
              to="/register"
              className="rounded-lg border border-indigo-600 bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white px-6 py-16 text-center">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900">
            Your Achievements, One Platform
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Manage your hackathon wins, conference appearances, competition
            results, and professional event history with real-time updates
            through PortfolioHub.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Search & Filter Milestones
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Quickly discover portfolio events by title, venue location, or
                scheduled date.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Track Registrations
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Register for technical events and view your personal portfolio
                participation history anytime.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Real-Time Notifications
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Receive instant WebSocket alerts whenever administrators add,
                update, or cancel portfolio events.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
