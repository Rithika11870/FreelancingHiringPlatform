import React, { useState } from "react";

function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const project = {
      title: title,
      description: description,
      budget: Number(budget),
      category: skills,
      clientName: "Client"
    };

    try {
      const response = await fetch("http://localhost:8080/api/projects/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
      });

      if (response.ok) {
        alert("Project details added successfully!");

        setTitle("");
        setDescription("");
        setBudget("");
        setSkills("");
      } else {
        alert("Failed to add project!");
      }
    } catch (error) {
      console.error(error);
      alert("Server connection failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Post a Project</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Required Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />

          <button type="submit">Post Project</button>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;