import React, { useState, useEffect } from "react";
import "../App.css";
import DashboardHome from "./DashboardHome";
import Sidebar from "./Sidebar";
function Dashboard({ user, onPostProject }) {
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [showReviews, setShowReviews] = useState(false);
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
  const handleViewMyProjects = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/projects/client/${user.email}`
    );

    if (response.ok) {
      const data = await response.json();
      setProjects(data);
      setShowProjects(true);
    } else {
      alert("Failed to load your projects!");
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
  projectTitle: project.title,
  clientEmail: project.clientEmail,
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
useEffect(() => {
  if (activePage === "applications" || activePage === "reviews") {
    if (user.role === "USER") {
      handleViewApplications();
    } else {
      handleMyApplications();
    }
  }
}, [activePage]);
  return (
    <div className="dashboard-layout">
    <div className="dashboard-page">
      <Sidebar
  user={user}
  activePage={activePage}
  onPostProject={onPostProject}
 onNavigate={(page) => {
  setActivePage(page);

  if (page === "projects") {
    handleViewProjects();
  }

  if (page === "my-projects") {
    handleViewMyProjects();
  }
}}
  onLogout={() => {
  localStorage.removeItem("user");
  window.location.reload();
}}
/>
      <div className="dashboard-container">
        {activePage === "dashboard" && (
  <DashboardHome user={user} onNavigate={setActivePage} />
)}
   {activePage !== "dashboard" && user && (
  user.role === "USER" ? (
          <div>


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
{activePage === "profile" && (
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
{activePage === "edit-profile" && (
  <div className="profile-box">
    <h3>Edit Profile</h3>

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
            const updatedUser = await response.json();
            user.name = updatedUser.name;
            alert("Profile updated successfully!");
          } else {
            alert("Profile update failed!");
          }
        } catch (error) {
          console.error(error);
          alert("Server connection failed!");
        }
      }}
    >
      Update Name
    </button>
  </div>
)}
            {activePage === "projects" && (
  <button onClick={handleViewProjects}>
    Browse Projects
  </button>
)}
            {activePage === "applications" && applications.length > 0 && (
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
  <strong>Project Name:</strong>{" "}
  {application.projectTitle || "Project name not available"}
</p>
{application.workLink && (
  <p>
    <strong>Completed Work:</strong>{" "}
    <a
      href={application.workLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Submitted Work
    </a>
  </p>
)}
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
       
        {(application.status || "").toUpperCase() === "PENDING" && (
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
{activePage === "reviews" && (
  <div>
    <h3>⭐ Reviews & Ratings</h3>

    {applications.filter(
      (application) =>
        (application.status || "").toUpperCase() === "ACCEPTED"
    ).length === 0 ? (
      <p>No accepted applications found.</p>
    ) : (
      applications
        .filter(
          (application) =>
            (application.status || "").toUpperCase() === "ACCEPTED"
        )
        .map((application) => (
          <div key={application.id}>
            <hr />

            <p>
              <strong>Freelancer Name:</strong>{" "}
              {application.freelancerName}
            </p>

            <p>
              <strong>Freelancer Email:</strong>{" "}
              {application.freelancerEmail}
            </p>
<p>
  <strong>Project Name:</strong>{" "}
  {application.projectTitle || "Project title not available"}
</p>

            {application.rating ? (
              <>
                <p>⭐ Rating: {application.rating}/5</p>
                <p>Review: {application.review}</p>
              </>
            ) : (
              <>
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
                    ).value.trim();

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
                      handleViewApplications();
                    } else {
                      alert("Failed to submit review!");
                    }
                  }}
                >
                  Submit Review
                </button>
              </>
            )}
          </div>
        ))
    )}
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
{activePage === "messages" && (
  <div className="messages-section">
    <button onClick={() => handleViewMessages(user.email)}>
      Refresh Messagess
    </button>

    {messages.length === 0 ? (
      <p>No messages found.</p>
    ) : (
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
  </div>
)}
         {activePage === "projects" && (
  <button onClick={handleViewProjects}>
    Browse Projects
  </button>
)}
          {showProjects && activePage === "projects" && (
  <input
    type="text"
    placeholder="Search projects..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
)}
   {activePage === "applications" && (
  <>
    <h3>My Applications</h3>

    {applications.length === 0 ? (
      <p>No applications found.</p>
    ) : (
      applications.map((application) => (
        <div key={application.id}>
          <hr />

          <p>
            <strong>Project ID:</strong> {application.projectId}
          </p>
          <p>
  <strong>Client Email:</strong>{" "}
  {application.clientEmail || "Not available"}
</p>

          <p>
            <strong>Proposal:</strong> {application.proposal}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {application.status === "PENDING"
              ? "⏳ Pending"
              : application.status === "ACCEPTED"
              ? "✅ Accepted"
              : application.status === "REJECTED"
              ? "❌ Rejected"
              : application.status}
          </p>
{application.status === "ACCEPTED" && (
  <button
    onClick={async () => {
      const workLink = prompt(
        "Enter your completed work link:"
      );

      if (!workLink) {
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/applications/${application.id}/submit-work?workLink=${encodeURIComponent(workLink)}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert("Completed work submitted successfully!");
      } else {
        alert("Failed to submit completed work!");
      }
    }}
  >
    Submit Completed Work
  </button>
)}
          {application.notification && (
            <p>
              <strong>Notification:</strong>{" "}
              {application.notification}
            </p>
          )}

         
        </div>
      ))
    )}
  </>
)}     

{activePage === "profile" && (
  <div className="profile-box">
    {activePage === "edit-profile" && (
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
)}
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
{activePage === "edit-profile" && (
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
)}
            
            {showProjects && activePage === "projects" && (
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
        )
    )}
      </div>
    </div>
    </div>
  );
}

export default Dashboard;