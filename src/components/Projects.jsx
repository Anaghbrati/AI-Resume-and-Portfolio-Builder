import { useState } from "react";

function Projects({ projects, setResume }) {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          technologies: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setResume((prev) => {
      const updatedProjects = [...prev.projects];

      updatedProjects[index] = {
        ...updatedProjects[index],
        [name]: value,
      };

      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };

  const removeProject = (index) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // ✨ Improve project description using Gemini
  const improveWithAI = async (index) => {
    const description = projects[index].description.trim();

    if (!description) {
      alert("Please enter a project description first.");
      return;
    }

    try {
      setLoadingIndex(index);

      const response = await fetch(
        "http://127.0.0.1:8000/api/improve-project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "AI improvement failed");
      }

      // Update the project description with AI response
      setResume((prev) => {
        const updatedProjects = [...prev.projects];

        updatedProjects[index] = {
          ...updatedProjects[index],
          description: data.improved,
        };

        return {
          ...prev,
          projects: updatedProjects,
        };
      });
    } catch (error) {
      console.error("AI Error:", error);
      alert("Unable to improve the project. Please try again.");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="projects-section">
      <h2>Projects</h2>

      {projects.map((project, index) => (
        <div className="project-card" key={index}>
          <h3>Project {index + 1}</h3>

          <div className="input-grid">
            <div className="input-group">
              <label>Project Name</label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Expense Tracker"
                value={project.name}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Technologies</label>

              <input
                type="text"
                name="technologies"
                placeholder="React, Node.js, MongoDB"
                value={project.technologies}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>

          <div className="input-group project-description">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Describe what you built..."
              value={project.description}
              onChange={(e) => handleChange(index, e)}
              rows="4"
            />
          </div>

          <div className="input-grid">
            <div className="input-group">
              <label>GitHub URL</label>

              <input
                type="url"
                name="github"
                placeholder="https://github.com/..."
                value={project.github}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Live Demo URL</label>

              <input
                type="url"
                name="liveDemo"
                placeholder="https://..."
                value={project.liveDemo}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>

          <div className="project-actions">
            <button
              type="button"
              className="ai-small-button"
              onClick={() => improveWithAI(index)}
              disabled={loadingIndex === index}
            >
              {loadingIndex === index
                ? "✨ Improving..."
                : "✨ Improve with AI"}
            </button>

            <button
              type="button"
              className="remove-button"
              onClick={() => removeProject(index)}
            >
              Remove Project
            </button>
          </div>
        </div>
      ))}

      <button type="button" className="add-button" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
}

export default Projects;