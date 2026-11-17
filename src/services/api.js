const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("portfolioHubToken");

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// Event API
export function getEvents() {
  return apiRequest("/events");
}

export function createEvent(eventData) {
  return apiRequest("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}

export function updateEvent(id, eventData) {
  return apiRequest(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(eventData),
  });
}

export function deleteEvent(id) {
  return apiRequest(`/events/${id}`, {
    method: "DELETE",
  });
}

// Registration API
export function registerForEvent(eventId) {
  return apiRequest("/registrations", {
    method: "POST",
    body: JSON.stringify({ eventId }),
  });
}

export function getMyRegistrations() {
  return apiRequest("/registrations/my");
}

export function getAllRegistrations() {
  return apiRequest("/registrations");
}

// Auth API
export function registerUser(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function loginUser(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getCurrentUser() {
  return apiRequest("/auth/me");
}

// Profile API (with ownership protection)
export function getUserProfile(id) {
  return apiRequest(`/profiles/${id}`);
}
