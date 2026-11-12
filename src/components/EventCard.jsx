function EventCard({
  event,
  title,
  description,
  date,
  time,
  location,
  isRegistered = false,
  registering = false,
  onRegister,
}) {
  const displayTitle = event?.title ?? title;
  const displayDescription = event?.description ?? description;
  const displayDate = event?.date ?? date;
  const displayTime = event?.time ?? time;
  const displayLocation = event?.location ?? location;

  const formattedDate = displayDate
    ? new Date(displayDate).toLocaleDateString("en-IN", {
        timeZone: "UTC",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold text-slate-900">{displayTitle}</h2>
          {isRegistered && (
            <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Registered
            </span>
          )}
        </div>

        <p className="mt-2 text-slate-600">{displayDescription}</p>

        <div className="mt-4 space-y-1 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-slate-700">Date:</span>{" "}
            {formattedDate}
          </p>
          <p>
            <span className="font-semibold text-slate-700">Time:</span>{" "}
            {displayTime}
          </p>
          <p>
            <span className="font-semibold text-slate-700">Location:</span>{" "}
            {displayLocation}
          </p>
        </div>
      </div>

      {onRegister && (
        <div className="mt-5">
          {isRegistered ? (
            <p className="rounded-lg bg-green-50 px-4 py-2 text-center text-sm font-semibold text-green-700">
              Successfully Registered!
            </p>
          ) : (
            <button
              type="button"
              disabled={registering}
              onClick={onRegister}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {registering ? "Registering..." : "Register"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default EventCard;
