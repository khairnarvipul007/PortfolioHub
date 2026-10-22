import useAuth from "../hooks/useAuth";

function MyRegistrations() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">
          My Portfolio Events
        </h1>

        {user ? (
          <p className="mt-4 text-slate-600">
            Welcome,{" "}
            <span className="font-semibold">
              {user.name}
            </span>
            . Your registered portfolio events will appear here.
          </p>
        ) : (
          <p className="mt-4 text-red-600">
            Please login to view your portfolio events.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyRegistrations;
