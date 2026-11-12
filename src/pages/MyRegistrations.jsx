import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import { getMyRegistrations } from "../services/api";

function MyRegistrations() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(() => Boolean(user));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    let active = true;

    async function loadRegistrations() {
      try {
        const data = await getMyRegistrations();
        if (active) {
          setRegistrations(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load your registrations");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRegistrations();
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              My Portfolio Events
            </h1>
            {user && (
              <p className="mt-2 text-slate-600">
                Welcome, <span className="font-semibold">{user.name}</span>.
                Here are your registered portfolio milestones.
              </p>
            )}
          </div>

          <Link
            to="/events"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            Browse More Events
          </Link>
        </div>

        {loading && <Loading />}

        {!loading && error && (
          <p className="mt-6 text-red-600">{error}</p>
        )}

        {!loading && !error && registrations.length === 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">
              You have not registered for any portfolio events yet.
            </p>
            <Link
              to="/events"
              className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
            >
              Explore Portfolio Events
            </Link>
          </div>
        )}

        {!loading && !error && registrations.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {registrations.map((reg) => {
              const event = reg.event;
              if (!event) return null;

              return (
                <div
                  key={reg._id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {event.title}
                    </h2>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Registered
                    </span>
                  </div>

                  <p className="mt-2 text-slate-600">{event.description}</p>

                  <div className="mt-4 space-y-1 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-700">Date:</span>{" "}
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        timeZone: "UTC",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Time:</span>{" "}
                      {event.time}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">
                        Location:
                      </span>{" "}
                      {event.location}
                    </p>
                    <p className="pt-2 text-xs text-slate-400">
                      Registered on{" "}
                      {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRegistrations;
