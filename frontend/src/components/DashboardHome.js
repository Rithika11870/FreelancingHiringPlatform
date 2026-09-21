import React from "react";

function DashboardHome({ user, onNavigate }) {
  return (
    <div className="home-dashboard">
      <div className="welcome-card">
        <h2>Welcome back, {user.name}! 👋</h2>
        <p>
          Ready to take on new projects? Explore opportunities,
          connect with clients and grow your freelance career.
        </p>

      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>0</h3>
          <p>Active Projects</p>
        </div>

        <div className="stat-card">
          <h3>0</h3>
          <p>Applications Sent</p>
        </div>

        <div className="stat-card">
          <h3>0</h3>
          <p>Shortlisted</p>
        </div>

        <div className="stat-card">
          <h3>100%</h3>
          <p>Profile Complete</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;