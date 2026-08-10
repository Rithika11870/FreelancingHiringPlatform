import React, { useState } from "react";
import "../App.css";

function Dashboard({ user, onPostProject }) {
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);

  const handleViewProjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/projects");

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        setShowProjects(true);
      } else {
        alert("Failed to load projects!");
      }
    } catch (error) {
      console.error(error);
      alert("Server connection failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome, {user.name}!</h2>
        <p>Role: {user.role}</p>

        {user.role === "USER" ? (
          <div>
            <h3>Client Dashboard</h3>

            <button onClick={onPostProject}>
              Post a Project
            </button>

            <button onClick={handleViewProjects}>
              My Projects
            </button>

            <button>
              View Applications
            </button>

            {showProjects && (
              <div>
                <h3>My Projects</h3>

                {projects.length === 0 ? (
                  <p>No projects found.</p>
                ) : (
                  projects.map((project) => (
                    <div key={project.id}>
                      <hr />

                      <h4>{project.title}</h4>

                      <p>{project.description}</p>

                      <p>
                        <strong>Budget:</strong> ₹{project.budget}
                      </p>

                      <p>
                        <strong>Client:</strong> {project.clientName}
                      </p>

                      <p>
                        <strong>Category:</strong> {project.category}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3>Freelancer Dashboard</h3>

            <button>Browse Projects</button>
            <button>My Applications</button>
            <button>My Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;