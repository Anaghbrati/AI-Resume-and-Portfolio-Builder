function Education({ education, setResume }) {
  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          field: "",
          startYear: "",
          endYear: "",
          cgpa: "",
        },
      ],
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setResume((prev) => {
      const updatedEducation = [...prev.education];

      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };

      return {
        ...prev,
        education: updatedEducation,
      };
    });
  };

  const removeEducation = (index) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="section">
      <h2>Education</h2>

      {education.map((edu, index) => (
        <div className="education-card" key={index}>
          <h3>Education {index + 1}</h3>

          <div className="input-grid">
            <div className="input-group">
              <label>Institution</label>
              <input
                type="text"
                name="institution"
                placeholder="College / School"
                value={edu.institution}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                placeholder="B.Tech"
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Field of Study</label>
              <input
                type="text"
                name="field"
                placeholder="Computer Science Engineering"
                value={edu.field}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>CGPA / Percentage</label>
              <input
                type="text"
                name="cgpa"
                placeholder="8.5 CGPA"
                value={edu.cgpa}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Start Year</label>
              <input
                type="text"
                name="startYear"
                placeholder="2024"
                value={edu.startYear}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>End Year</label>
              <input
                type="text"
                name="endYear"
                placeholder="2028"
                value={edu.endYear}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>

          <button
            className="remove-button"
            onClick={() => removeEducation(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button className="add-button" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );
}

export default Education;