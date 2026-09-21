import React, { useState } from "react";
import "../App.css";

function Dashboard({ user, onPostProject }) {
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const handleMyApplications = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/applications/freelancer/${user.email}`
    );

    if (response.ok) {
      const data = await response.json();
      setApplications(data);
    } else {
      alert("Failed to load your applications!");
    }
  } catch (error) {
    console.error(error);
    alert("Server connection failed!");
  }
};
 const handleViewApplications = async () => {
  try {
    const projectsResponse = await fetch(
      "http://localhost:8080/api/projects"
    );

    if (!projectsResponse.ok) {
      alert("Failed to load projects!");
      return;
    }

    const projectsData = await projectsResponse.json();

    let allApplications = [];

    for (const project of projectsData) {
      const response = await fetch(
        `http://localhost:8080/api/applications/project/${project.id}`
      );

      if (response.ok) {
        const data = await response.json();
        allApplications = [...allApplications, ...data];
      }
    }

    setApplications(allApplications);
  } catch (error) {
    console.error(error);
    alert("Server connection failed!");
  }
};
  const handleApplicationStatus = async (applicationId, status) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/applications/${applicationId}/status?status=${status}`,
      {
        method: "PUT"
      }
    );

    if (response.ok) {
      alert(`Application ${status.toLowerCase()} successfully!`);
      handleViewApplications();
    } else {
      alert("Failed to update application status!");
    }
  } catch (error) {
    console.error(error);
    alert("Server connection failed!");
  }
};
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
const handleSendMessage = async (receiverEmail) => {
  const content = prompt("Enter your message:");

  if (!content) {
    return;
  }

  const message = {
    senderEmail: user.email,
    receiverEmail: receiverEmail,
    content: content,
  };

  const response = await fetch(
    "http://localhost:8080/api/messages/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );

  if (response.ok) {
    alert("Message sent successfully!");
  } else {
    alert("Failed to send message!");
  }
};
const handleViewMessages = async (otherEmail) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/messages/conversation?senderEmail=${encodeURIComponent(
        user.email
      )}&receiverEmail=${encodeURIComponent(otherEmail)}`
    );

    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    } else {
      alert("Failed to load messages!");
    }
  } catch (error) {
    console.error(error);
    alert("Server connection failed!");
  }
};
  const handleApply = async (project) => {
    const proposal = prompt(
      "Enter your proposal for this project:"
    );

    if (!proposal) {
      return;
    }

    const application = {
      projectId: project.id,
      freelancerName: user.name,
      freelancerEmail: user.email,
      proposal: proposal
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/applications/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(application)
        }
      );

      if (response.ok) {
        alert("Application submitted successfully!");
      } else {
        alert("Application failed!");
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
<button onClick={() => window.location.reload()}>
  Logout
</button>
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

            <button onClick={handleViewApplications}>
              View Applications
            </button>
            {applications.length > 0 && (
  <div>
    <h3>Applications</h3>

    {applications.map((application) => (
      <div key={application.id}>
        <hr />

        <h4>{application.freelancerName}</h4>

        <p>
          <strong>Email:</strong>{" "}
          {application.freelancerEmail}
        </p>

        <p>
          <strong>Proposal:</strong>{" "}
          {application.proposal}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {application.status}
          <button
  onClick={() => handleSendMessage(application.freelancerEmail)}
>
  Message Freelancer
</button>
        </p>
        {application.status === "PENDING" && (
  <div>
    <button
      onClick={() =>
        handleApplicationStatus(application.id, "ACCEPTED")
      }
    >
      Accept
    </button>

    <button
      onClick={() =>
        handleApplicationStatus(application.id, "REJECTED")
      }
    >
      Reject
    </button>
  </div>
)}
      </div>
    ))}
  </div>
)}

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
                      <button
  onClick={async () => {
    const response = await fetch(
      `http://localhost:8080/api/projects/${project.id}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      alert("Project deleted successfully!");
      handleViewProjects();
    } else {
      alert("Failed to delete project!");
    }
  }}
>
  Delete
</button>
                      <p>Project ID: {project.id}</p>
                      <p>{project.description}</p>

                      <p>
                        <strong>Budget:</strong> ₹{project.budget}
                      </p>

                      <p>
                        <strong>Client:</strong>{" "}
                        {project.clientName}
                      </p>

                      <p>
                        <strong>Category:</strong>{" "}
                        {project.category}
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
             <button
  className="dashboard-button"
  onClick={() => {
    const otherEmail = prompt("Enter client email:");
    if (otherEmail) {
      handleViewMessages(otherEmail);
    }
  }}
>
  View Messages
</button>
{messages.length > 0 && (
  <div className="messages-box">
    <h3>Messages</h3>

    {messages.map((message) => (
      <div key={message.id}>
        <p>
          <strong>From:</strong> {message.senderEmail}
        </p>
        <p>
          <strong>Message:</strong> {message.content}
        </p>
        <hr />
      </div>
    ))}
  </div>
)}
            <button onClick={handleViewProjects}>
              Browse Projects
            </button>
            {showProjects && (
  <input
    type="text"
    placeholder="Search projects..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
)}
<button className="dashboard-button" onClick={handleMyApplications}>
  My Applications
</button>
{applications.length > 0 && (
  <div>
    <h3>My Applications</h3>

    {applications.map((application) => (
      <div key={application.id}>
        <hr />

        <p>
          <strong>Project ID:</strong> {application.projectId}
        </p>

        <p>
          <strong>Proposal:</strong> {application.proposal}
        </p>

        <p>
          <strong>Status:</strong>{" "}
{application.status === "PENDING"
  ? "⏳ Waiting for client response"
  : application.status === "ACCEPTED"
  ? "✅ Application Accepted"
  : application.status === "REJECTED"
  ? "❌ Application Rejected"
  : application.status}
  {application.notification && (
  <p>
    <strong>Notification:</strong> {application.notification}
  </p>
)}
  {application.status === "ACCEPTED" && (
  <div>
    <input
      type="number"
      min="1"
      max="5"
      placeholder="Rating (1-5)"
      id={`rating-${application.id}`}
    />

    <input
      type="text"
      placeholder="Write your review"
      id={`review-${application.id}`}
    />

    <button
      onClick={async () => {
        const rating = document.getElementById(
          `rating-${application.id}`
        ).value;

        const review = document.getElementById(
          `review-${application.id}`
        ).value;

        if (!rating || !review) {
          alert("Please enter rating and review!");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/applications/${application.id}/review?rating=${rating}&review=${encodeURIComponent(review)}`,
          {
            method: "POST",
          }
        );

        if (response.ok) {
          alert("Review submitted successfully!");
        } else {
          alert("Failed to submit review!");
        }
      }}
    >
      Submit Review
    </button>
  </div>
)}
        </p>
      </div>
    ))}
  </div>
)}
            
<button
  className="dashboard-button"
  onClick={() => setShowProfile(!showProfile)}
>
  My Profile
</button>
<button
  className="dashboard-button"
  onClick={async () => {
    const newName = prompt("Enter your new name:", user.name);

    if (!newName) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: newName,
          }),
        }
      );

      if (response.ok) {
        user.name = newName;
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile!");
      }
    } catch (error) {
      console.error(error);
      alert("Server connection failed!");
    }
  }}
>
  Edit Profile
</button>
{showProfile && (
  <div className="profile-box">
    <h3>My Profile</h3>

    <p>
      <strong>Name:</strong> {user.name}
    </p>

    <p>
      <strong>Email:</strong> {user.email}
    </p>

    <p>
      <strong>Role:</strong> {user.role}
    </p>
  </div>
)}
            
            {showProjects && (
              <div>

                <h3>Available Projects</h3>

                {projects.length === 0 ? (
                  <p>No projects available.</p>
                ) : (
                 projects
  .filter((project) =>
    (project.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((project) => (
                    <div key={project.id}>

                      <hr />

                      <h4>{project.title}</h4>
                      
                      <p>Project ID: {project.id}</p>

                      <p>{project.description}</p>

                      <p>
                        <strong>Budget:</strong> ₹{project.budget}
                      </p>

                      <p>
                        <strong>Client:</strong>{" "}
                        {project.clientName}
                      </p>

                      <p>
                        <strong>Category:</strong>{" "}
                        {project.category}
                      </p>

                      <button
                        onClick={() => handleApply(project)}
                      >
                        Apply
                      </button>

                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;