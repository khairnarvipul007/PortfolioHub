function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-100 px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-slate-900 md:text-6xl">
          Build Your Professional Portfolio
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Showcase your hackathons, conferences, and technical milestones.
          Track your professional journey all in one place.
        </p>
        <button
          className="mt-8 rounded-lg bg-indigo-600 px-6 py-3
            font-semibold text-white transition
            hover:bg-indigo-700"
        >
          Explore Portfolio
        </button>
      </section>

      {/* Introduction Section */}
      <section className="bg-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Your Achievements, One Platform
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Manage your hackathon wins, conference appearances,
          competition results, and professional event history
          with a clean, modern portfolio system.
        </p>
      </section>
    </div>
  );
}

export default Home;
