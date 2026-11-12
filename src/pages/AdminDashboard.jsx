import { useEffect, useState } from "react";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import {
  createEvent,
  deleteEvent,
  getAllRegistrations,
  getEvents,
  updateEvent,
} from "../services/api";

const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
};

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("events");

  const [createForm, setCreateForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [updating, setUpdating] = useState(false);

  const [deletingId, setDeletingId] = useState("");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  useEffect(() => {
    let active = true;

    async function fetchInitialData() {
      try {
        const [eventsData, regsData] = await Promise.all([
          getEvents(),
          getAllRegistrations(),
        ]);
        if (active) {
          setEvents(eventsData);
          setRegistrations(regsData);
        }
      } catch (err) {
        if (active) {
          setFeedback({
            type: "error",
            text: err.message || "Failed to load admin dashboard data.",
          });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchInitialData();
    return () => {
      active = false;
    };
  }, []);

  function handleCreateChange(e) {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreateSubmit(e) {
    e.preventDefault();
    setFeedback({ type: "", text: "" });

    if (
      !createForm.title.trim() ||
      !createForm.description.trim() ||
      !createForm.date ||
      !createForm.time.trim() ||
      !createForm.location.trim()
    ) {
      setFeedback({ type: "error", text: "All event fields are required." });
      return;
    }

    try {
      setCreating(true);
      const data = await createEvent(createForm);
      setEvents((prev) => [...prev, data.event]);
      setCreateForm(EMPTY_FORM);
      setFeedback({
        type: "success",
        text: `Portfolio event "${data.event.title}" created successfully!`,
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.message || "Failed to create event.",
      });
    } finally {
      setCreating(false);
    }
  }

  function openEditModal(event) {
    setEditingEvent(event);
    setEditForm({
      title: event.title || "",
      description: event.description || "",
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      time: event.time || "",
      location: event.location || "",
    });
  }

  function closeEditModal() {
    setEditingEvent(null);
    setEditForm(EMPTY_FORM);
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    if (!editingEvent) return;
    setFeedback({ type: "", text: "" });

    try {
      setUpdating(true);
      const data = await updateEvent(editingEvent._id, editForm);
      setEvents((prev) =>
        prev.map((ev) => (ev._id === editingEvent._id ? data.event : ev))
      );
      closeEditModal();
      setFeedback({
        type: "success",
        text: `Portfolio event "${data.event.title}" updated successfully!`,
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.message || "Failed to update event.",
      });
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete(event) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );
    if (!confirmed) return;

    setFeedback({ type: "", text: "" });
    try {
      setDeletingId(event._id);
      await deleteEvent(event._id);
      setEvents((prev) => prev.filter((ev) => ev._id !== event._id));
      setRegistrations((prev) =>
        prev.filter((reg) => reg.event?._id !== event._id)
      );
      setFeedback({
        type: "success",
        text: `Portfolio event "${event.title}" deleted successfully.`,
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.message || "Failed to delete event.",
      });
    } finally {
      setDeletingId("");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Portfolio Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Create, update, and delete portfolio events, and monitor user
              registrations.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Total Events
              </p>
              <p className="text-2xl font-bold text-indigo-600">
                {events.length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Registrations
              </p>
              <p className="text-2xl font-bold text-indigo-600">
                {registrations.length}
              </p>
            </div>
          </div>
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

        {/* Navigation Tabs */}
        <div className="mt-8 flex gap-3 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("events")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "events"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            Manage Portfolio Events ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("registrations")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "registrations"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            View Registrations ({registrations.length})
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : activeTab === "events" ? (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Create Event Form */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md lg:col-span-1">
              <h2 className="text-xl font-bold text-slate-900">
                Create Portfolio Event
              </h2>
              <form onSubmit={handleCreateSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={createForm.title}
                    onChange={handleCreateChange}
                    required
                    placeholder="e.g., AI Innovation Summit 2026"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={createForm.description}
                    onChange={handleCreateChange}
                    required
                    placeholder="Describe the portfolio milestone or event..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={createForm.date}
                      onChange={handleCreateChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Time
                    </label>
                    <input
                      type="text"
                      name="time"
                      value={createForm.time}
                      onChange={handleCreateChange}
                      required
                      placeholder="10:00 AM"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={createForm.location}
                    onChange={handleCreateChange}
                    required
                    placeholder="e.g., Mumbai"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                >
                  {creating ? "Creating..." : "Create Event"}
                </Button>
              </form>
            </div>

            {/* Existing Events List */}
            <div className="space-y-4 lg:col-span-2">
              {events.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-600">
                  No portfolio events created yet. Use the form to add one.
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event._id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {event.description}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          timeZone: "UTC",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        • {event.time} • {event.location}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(event)}
                        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === event._id}
                        onClick={() => handleDelete(event)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                      >
                        {deletingId === event._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* All Registrations View */
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
            {registrations.length === 0 ? (
              <p className="p-10 text-center text-slate-600">
                No user registrations found yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Portfolio Event</th>
                      <th className="px-6 py-4">Event Date</th>
                      <th className="px-6 py-4">Registered On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {registrations.map((reg) => (
                      <tr key={reg._id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {reg.user?.name || "Deleted User"}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {reg.user?.email || "—"}
                        </td>
                        <td className="px-6 py-4 font-medium text-indigo-700">
                          {reg.event?.title || "Deleted Event"}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {reg.event?.date
                            ? new Date(reg.event.date).toLocaleDateString(
                                "en-IN",
                                {
                                  timeZone: "UTC",
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Event Modal */}
      <Modal
        isOpen={Boolean(editingEvent)}
        onClose={closeEditModal}
        title="Edit Portfolio Event"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={editForm.description}
              onChange={handleEditChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={editForm.date}
                onChange={handleEditChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Time
              </label>
              <input
                type="text"
                name="time"
                value={editForm.time}
                onChange={handleEditChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={editForm.location}
              onChange={handleEditChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeEditModal}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <Button type="submit">
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
