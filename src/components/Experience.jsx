
import { useState } from "react";

function Experience({ experience, setResume }) {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          role: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setResume((prev) => {
      const updatedExperience = [...prev.experience];

      updatedExperience[index] = {
        ...updatedExperience[index],
        [name]: value,
      };

      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };

  // ✨ Improve experience description using Gemini
  const improveWithAI = async (index) => {
    const description = experience[index].description.trim();

    if (!description) {
      alert("Please enter an experience description first.");
      return;
    }

    try {
      setLoadingIndex(index);

      const response = await fetch(
        "http://127.0.0.1:8000/api/improve-experience",
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
        throw new Error(
          data.message || "AI improvement failed"
        );
      }

      // Update experience description with AI response
      setResume((prev) => {
        const updatedExperience = [...prev.experience];

        updatedExperience[index] = {
          ...updatedExperience[index],
          description: data.improved,
        };

        return {
          ...prev,
          experience: updatedExperience,
        };
      });
    } catch (error) {
      console.error("AI Experience Error:", error);

      alert(
        "Unable to improve the experience. Please try again."
      );
    } finally {
      setLoadingIndex(null);
    }
  };

  const removeExperience = (index) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="experience-section">
      <h2>Experience</h2>

      {experience.map((exp, index) => (
        <div className="experience-card" key={index}>
          <h3>Experience {index + 1}</h3>

          <div className="input-grid">
            <div className="input-group">
              <label>Company / Organization</label>

              <input
                type="text"
                name="company"
                placeholder="e.g. Google"
                value={exp.company}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Role / Position</label>

              <input
                type="text"
                name="role"
                placeholder="e.g. Software Developer Intern"
                value={exp.role}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Kolkata, India"
                value={exp.location}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Start Date</label>

              <input
                type="text"
                name="startDate"
                placeholder="e.g. June 2025"
                value={exp.startDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>End Date</label>

              <input
                type="text"
                name="endDate"
                placeholder="e.g. August 2025 / Present"
                value={exp.endDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>

          <div className="input-group experience-description">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Describe your responsibilities and achievements..."
              value={exp.description}
              onChange={(e) => handleChange(index, e)}
              rows="4"
            />
          </div>

          <div className="experience-actions">
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
              onClick={() => removeExperience(index)}
            >
              Remove Experience
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="add-button"
        onClick={addExperience}
      >
        + Add Experience
      </button>
      <br /> <br />
    </div>
  );
}

export default Experience;