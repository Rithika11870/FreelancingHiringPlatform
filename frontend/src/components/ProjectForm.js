import React, { useState } from "react";
import "./ProjectForm.css";

function ProjectForm({ onBack, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const [deadline, setDeadline] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !budget || !skills) {
      alert("Please fill all fields!");
      return;
    }

    if (Number(budget) <= 0) {
      alert("Budget must be greater than zero!");
      return;
    }

   console.log("Logged-in user:", user);

const project = {
  title,
  description,
  budget: Number(budget),
  category: skills,
  deadline,
  clientName: user.name || "Client",
  clientEmail: user.email,
};
console.log("Project data:", JSON.stringify(project, null, 2));
    try {
      const response = await fetch("http://localhost:8080/api/projects/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        alert("Project details added successfully!");

        setTitle("");
        setDescription("");
        setBudget("");
        setSkills("");
      } else {
  const errorText = await response.text();
  console.log("Backend Error:", response.status, errorText);
  alert("Failed to add project! Status: " + response.status);
}
    } catch (error) {
      console.error(error);
      alert("Server connection failed!");
    }
  };

  return (
    <div className="project-form-page">
      <div className="project-form-card">
        <div className="project-form-header">
          <span className="project-form-icon">🚀</span>
          <h1>Post a Project</h1>
          <p>
            Share your project requirements and connect with talented
            freelancers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              placeholder="Enter your project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Project Description</label>
            <textarea
              placeholder="Describe your project requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Budget (₹)</label>
              <input
                type="number"
                placeholder="Enter budget"
                min="1"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
              <div className="form-group">
  <label>Project Deadline</label>
  <input
    type="date"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
    required
  />
</div>
            </div>

            <div className="form-group">
              <label>Required Skills</label>
              <input
                type="text"
                placeholder="React, Java, UI/UX"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="project-form-actions">
            <button
              type="button"
              className="back-button"
              onClick={onBack}
            >
              ← Back to Dashboard
            </button>

            <button type="submit" className="submit-button">
              Post Project →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;