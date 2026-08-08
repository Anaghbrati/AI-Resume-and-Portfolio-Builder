import { useState } from "react";

function Skills({ skills, setResume }) {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    const trimmedSkill = skill.trim();

    if (!trimmedSkill) return;

    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, trimmedSkill],
    }));

    setSkill("");
  };

  const removeSkill = (index) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="section">
      <h2>Skills</h2>

      <div className="skill-input">
        <input
          type="text"
          placeholder="e.g. React"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addSkill();
            }
          }}
        />

        <button className="add-button" onClick={addSkill}>
          + Add Skill
        </button>
      </div>

      <div className="skills-list">
        {skills.map((item, index) => (
          <div className="skill-tag" key={index}>
            <span>{item}</span>

            <button onClick={() => removeSkill(index)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;