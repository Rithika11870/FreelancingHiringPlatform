import React from "react";

function Sidebar({ user, activePage, onNavigate, onLogout, onPostProject }) {
  const isFreelancer = user?.role === "FREELANCER";

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>〰 SkillBridge</h2>
        <p>Freelance • Hire • Grow</p>
      </div>

      <nav className="sidebar-menu">
        <button
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => onNavigate("dashboard")}
        >
          🏠 Dashboard
        </button>

        {isFreelancer ? (
          <>
            <button
              className={activePage === "messages" ? "active" : ""}
              onClick={() => onNavigate("messages")}
            >
              💬 View Messages
            </button>

            <button
              className={activePage === "projects" ? "active" : ""}
              onClick={() => onNavigate("projects")}
            >
              🔍 Browse Projects
            </button>

            <button
              className={activePage === "applications" ? "active" : ""}
              onClick={() => onNavigate("applications")}
            >
              📄 My Applications
            </button>
<button
  className={activePage === "reviews" ? "active" : ""}
  onClick={() => onNavigate("reviews")}
>
  ⭐ Reviews & Ratings
</button>
            <button
              className={activePage === "profile" ? "active" : ""}
              onClick={() => onNavigate("profile")}
            >
              👤 My Profile
            </button>

            <button
              className={activePage === "edit-profile" ? "active" : ""}
              onClick={() => onNavigate("edit-profile")}
            >
              ✏️ Edit Profile
            </button>
          </>
        ) : (
          <>
            <button
              className={activePage === "post-project" ? "active" : ""}
              onClick={onPostProject}
            >
              ➕ Post a Project
            </button>
<button
  className={activePage === "my-projects" ? "active" : ""}
  onClick={() => onNavigate("my-projects")}
>
  📁 My Projects
</button>
            <button
              className={activePage === "applications" ? "active" : ""}
              onClick={() => onNavigate("applications")}
            >
              📄 View Applications
            </button>
            <button
  className={activePage === "reviews" ? "active" : ""}
  onClick={() => onNavigate("reviews")}
>
  ⭐ Reviews & Ratings
</button>

            <button
              className={activePage === "messages" ? "active" : ""}
              onClick={() => onNavigate("messages")}
            >
              💬 Messages
            </button>

            <button
              className={activePage === "profile" ? "active" : ""}
              onClick={() => onNavigate("profile")}
            >
              👤 My Profile
            </button>

            <button
              className={activePage === "edit-profile" ? "active" : ""}
              onClick={() => onNavigate("edit-profile")}
            >
              ✏️ Edit Profile
            </button>
          </>
        )}
      </nav>

      <button className="sidebar-logout" onClick={onLogout}>
        🚪 Logout
      </button>
    </aside>
  );
}

export default Sidebar;