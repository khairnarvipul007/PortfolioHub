import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import {
  getEvents,
  getMyRegistrations,
  registerForEvent,
} from "../services/api";

function Events() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [registeredIds, setRegisteredIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const [registeringId, setRegisteringId] = useState("");

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const eventsData = await getEvents();
        setEvents(eventsData);

        if (user) {
          try {
            const regs = await getMyRegistrations();
            const ids = new Set(
              regs
                .filter((reg) => reg.event && reg.event._id)
                .map((reg) => reg.event._id)
            );
            setRegisteredIds(ids);
          } catch {
            // Keep events visible even if registrations fail to load
          }
        } else {
          setRegisteredIds(new Set());
        }
      } catch (err) {
        setError(err.message || "Unable to load portfolio events");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  const uniqueLocations = useMemo(() => {
    const locations = new Set(events.map((e) => e.location).filter(Boolean));
    return Array.from(locations).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);

      const matchesLocation =
        locationFilter === "all" || event.location === locationFilter;

      const eventDateString = event.date
        ? new Date(event.date).toISOString().split("T")[0]
        : "";
      const matchesDate = !dateFilter || eventDateString === dateFilter;

      return matchesSearch && matchesLocation && matchesDate;
    });
  }, [events, searchTerm, locationFilter, dateFilter]);

  async function handleRegister(eventId) {
    setFeedback({ type: "", text: "" });

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setRegisteringId(eventId);
      await registerForEvent(eventId);
      setRegisteredIds((prev) => new Set(prev).add(eventId));
      setFeedback({
        type: "success",
        text: "Successfully registered for the portfolio event!",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.message || "Could not complete registration.",
      });
    } finally {
      setRegisteringId("");
    }
  }

  function clearFilters() {
    setSearchTerm("");
    setLocationFilter("all");
    setDateFilter("");
  }

  const hasActiveFilters =
    searchTerm.trim() !== "" || locationFilter !== "all" || dateFilter !== "";

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Portfolio Events & Milestones
        </h1>
        <p className="mt-2 text-slate-600">
          Browse, search, and register for hackathons, conferences, and
          professional portfolio milestones.
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label
                htmlFor="event-search"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Search Portfolio Events
              </label>
              <input
                id="event-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="location-filter"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Filter by Location
              </label>
              <select
                id="location-filter"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Locations</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="date-filter"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Filter by Date
              </label>
              <input
                id="date-filter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
              <span className="text-slate-600">
                Showing {filteredEvents.length} of {events.length} portfolio
                events
              </span>
              <button
                type="button"
                onClick={clearFilters}
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {feedback.text && (
          <div
            role="status"
            className={`mt-6 rounded-lg px-4 py-3 text-sm font-medium ${
              feedback.type === "error"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {feedback.text}
          </div>
        )}

        {loading && <Loading />}

        {!loading && error && (
          <p className="mt-6 text-red-600">{error}</p>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-600">
              {events.length === 0
                ? "No portfolio events are available yet."
                : "No portfolio events match your search or filters."}
            </p>
          </div>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isRegistered={registeredIds.has(event._id)}
                registering={registeringId === event._id}
                onRegister={() => handleRegister(event._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
