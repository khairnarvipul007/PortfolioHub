import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import { getUserProfile } from "../services/api";

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchProfile() {
      if (!user?.id) return;
      try {
        setLoading(true);
        setError("");
        const res = await getUserProfile(user.id);
        if (active) {
          setProfile(res.data || res);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load profile data.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProfile();
    return () => {
      active = false;
    };
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
              <p className="mt-1 text-sm text-slate-500">
                Personal account and portfolio credentials
              </p>
            </div>
            <button
              onClick={loadProfile}
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              🔄 Refresh Profile
            </button>
          </div>

          {loading && (
            <div className="py-12">
              <Loading />
            </div>
          )}

          {!loading && error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && profile && (
            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white shadow-md">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {profile.name}
                  </h2>
                  <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
                    Role: {profile.role || "user"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email Address
                  </p>
                  <p className="mt-1 font-medium text-slate-900">
                    {profile.email}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Profile Resource ID
                  </p>
                  <p className="mt-1 font-mono text-xs font-bold text-indigo-600 break-all">
                    {profile._id || user.id}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Account Created
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {profile.createdAt
                      ? new Date(profile.createdAt).toLocaleString("en-IN", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })
                      : "Active Member"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
