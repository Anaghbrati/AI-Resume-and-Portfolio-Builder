function Experience({ experience, setResume }) {
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

  const removeExperience = (index) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="section">
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
              className="ai-small-button"
              onClick={() => {
                console.log("AI improvement coming soon");
              }}
            >
              ✨ Improve with AI
            </button>

            <button
              className="remove-button"
              onClick={() => removeExperience(index)}
            >
              Remove Experience
            </button>
          </div>
        </div>
      ))}

      <button className="add-button" onClick={addExperience}>
        + Add Experience
      </button>
    </div>
  );
}

export default Experience;