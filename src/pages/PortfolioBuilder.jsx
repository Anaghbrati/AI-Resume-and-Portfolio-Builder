
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PortfolioBuilder.css";
import technicalSkills from "./data/technicalSkills";

function PortfolioBuilder() {
  const navigate = useNavigate();

  // ==========================================
  // PORTFOLIO STATE
  // ==========================================

  const [portfolio, setPortfolio] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    about: "",
    skills: [],
    education: [],
    experience: [],
    projects: [],
  });

  const [skillInput, setSkillInput] = useState("");

  // ==========================================
  // PROFILE
  // ==========================================

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setPortfolio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SKILLS
  // ==========================================

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (portfolio.skills.includes(skill)) {
      setSkillInput("");
      return;
    }

    setPortfolio((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));

    setSkillInput("");
  };

  const removeSkill = (index) => {
    setPortfolio((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // ==========================================
  // EDUCATION
  // ==========================================

  const addEducation = () => {
    setPortfolio((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          college: "",
          startYear: "",
          endYear: "",
          percentage: "",
        },
      ],
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;

    setPortfolio((prev) => {
      const education = [...prev.education];

      education[index] = {
        ...education[index],
        [name]: value,
      };

      return {
        ...prev,
        education,
      };
    });
  };

  const removeEducation = (index) => {
    setPortfolio((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // ==========================================
  // EXPERIENCE
  // ==========================================

  const addExperience = () => {
    setPortfolio((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          role: "",
          startDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    setPortfolio((prev) => {
      const experience = [...prev.experience];

      experience[index] = {
        ...experience[index],
        [name]: type === "checkbox" ? checked : value,
      };

      return {
        ...prev,
        experience,
      };
    });
  };

  const removeExperience = (index) => {
    setPortfolio((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // ==========================================
  // PROJECTS
  // ==========================================

  const addProject = () => {
    setPortfolio((prev) => ({
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

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;

    setPortfolio((prev) => {
      const projects = [...prev.projects];

      projects[index] = {
        ...projects[index],
        [name]: value,
      };

      return {
        ...prev,
        projects,
      };
    });
  };

  const removeProject = (index) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // ==========================================
  // SAVE + PREVIEW
  // ==========================================

  const handlePreview = () => {
    // Save current portfolio data
    localStorage.setItem(
      "portfolioData",
      JSON.stringify(portfolio)
    );

    // Go to live portfolio
    navigate("/portfolio/preview");
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="portfolio-builder">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="portfolio-header">

        <span className="builder-badge">
          PORTFOLIO BUILDER
        </span>

        <h1>
          Build Your
          <span> Developer Portfolio</span>
        </h1>

        <p>
          Create a modern professional portfolio
          that showcases your skills, projects,
          experience and education.
        </p>

      </div>


      {/* =====================================
          PERSONAL INFORMATION
      ====================================== */}

      <section className="portfolio-section">

        <div className="section-heading">

          <div>
            <span className="section-number">
              01
            </span>

            <h2>
              Personal Information
            </h2>
          </div>

        </div>

        <div className="form-grid">

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={portfolio.name}
              onChange={handleProfileChange}
            />
          </div>


          <div className="input-group">
            <label>Professional Title</label>

            <input
              type="text"
              name="jobTitle"
              placeholder="Full Stack Developer"
              value={portfolio.jobTitle}
              onChange={handleProfileChange}
            />
          </div>


          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={portfolio.email}
              onChange={handleProfileChange}
            />
          </div>


          <div className="input-group">
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              placeholder="+91 9876543210"
              value={portfolio.phone}
              onChange={handleProfileChange}
            />
          </div>


          <div className="input-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              placeholder="Kolkata, India"
              value={portfolio.location}
              onChange={handleProfileChange}
            />
          </div>

        </div>


        <div className="input-group">

          <label>
            About Me
          </label>

          <textarea
            name="about"
            placeholder="Write a short professional introduction about yourself..."
            value={portfolio.about}
            onChange={handleProfileChange}
            rows="6"
          />

        </div>

      </section>


      {/* =====================================
          SKILLS
      ====================================== */}

      <section className="portfolio-section">

        <div className="section-heading">

          <div>

            <span className="section-number">
              02
            </span>

            <h2>
              Technical Skills
            </h2>

          </div>

        </div>


        <div className="skill-input">

          <select
            value={skillInput}
            onChange={(e) =>
              setSkillInput(e.target.value)
            }
          >

            <option value="">
              Select a technical skill
            </option>

            {technicalSkills
              .filter(
                (skill) =>
                  !portfolio.skills.includes(skill)
              )
              .map((skill) => (

                <option
                  key={skill}
                  value={skill}
                >
                  {skill}
                </option>

              ))}

          </select>


          <button
            type="button"
            onClick={addSkill}
          >
            + Add Skill
          </button>

        </div>


        {portfolio.skills.length > 0 && (

          <div className="skills-list">

            {portfolio.skills.map(
              (skill, index) => (

                <div
                  className="skill-tag"
                  key={index}
                >

                  <span>
                    {skill}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeSkill(index)
                    }
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* =====================================
          EDUCATION
      ====================================== */}

      <section className="portfolio-section">

        <div className="section-heading">

          <div>

            <span className="section-number">
              03
            </span>

            <h2>
              Education
            </h2>

          </div>


          <button
            type="button"
            className="add-button"
            onClick={addEducation}
          >
            + Add Education
          </button>

        </div>


        {portfolio.education.length === 0 && (

          <div className="empty-state">

            <p>
              Add your educational background.
            </p>

          </div>

        )}


        {portfolio.education.map(
          (education, index) => (

            <div
              className="dynamic-card"
              key={index}
            >

              <div className="card-header">

                <h3>
                  Education #{index + 1}
                </h3>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() =>
                    removeEducation(index)
                  }
                >
                  Remove
                </button>

              </div>


              <div className="form-grid">

                <div className="input-group">

                  <label>
                    Degree
                  </label>

                  <input
                    type="text"
                    name="degree"
                    placeholder="B.Tech in Computer Science"
                    value={education.degree}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        e
                      )
                    }
                  />

                </div>


                <div className="input-group">

                  <label>
                    College / University
                  </label>

                  <input
                    type="text"
                    name="college"
                    placeholder="ABC University"
                    value={education.college}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        e
                      )
                    }
                  />

                </div>


                <div className="input-group">

                  <label>
                    Start Year
                  </label>

                  <input
                    type="text"
                    name="startYear"
                    placeholder="2022"
                    value={education.startYear}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        e
                      )
                    }
                  />

                </div>


                <div className="input-group">

                  <label>
                    End Year
                  </label>

                  <input
                    type="text"
                    name="endYear"
                    placeholder="2026"
                    value={education.endYear}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        e
                      )
                    }
                  />

                </div>


                <div className="input-group">

                  <label>
                    Percentage / CGPA
                  </label>

                  <input
                    type="text"
                    name="percentage"
                    placeholder="8.5 CGPA"
                    value={education.percentage}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        e
                      )
                    }
                  />

                </div>

              </div>

            </div>

          )
        )}

      </section>


      {/* =====================================
          EXPERIENCE
      ====================================== */}

      <section className="portfolio-section">

        <div className="section-heading">

          <div>

            <span className="section-number">
              04
            </span>

            <h2>
              Experience
            </h2>

          </div>


          <button
            type="button"
            className="add-button"
            onClick={addExperience}
          >
            + Add Experience
          </button>

        </div>


        {portfolio.experience.length === 0 && (

          <div className="empty-state">

            <p>
              Add your professional experience,
              internships or work experience.
            </p>

          </div>

        )}


        {portfolio.experience.map(
          (experience, index) => (

            <div
              className="dynamic-card"
              key={index}
            >

              <div className="card-header">

                <h3>
                  Experience #{index + 1}
                </h3>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() =>
                    removeExperience(index)
                  }
                >
                  Remove
                </button>

              </div>


              <div className="form-grid">

                <div className="input-group">

                  <label>
                    Company Name
                  </label>

                  <input
                    type="text"
                    name="company"
                    placeholder="ABC Technologies"
                    value={experience.company}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        e
                      )
                    }
                  />

                </div>


                <div className="input-group">

                  <label>
                    Job Role
                  </label>

                  <input
                    type="text"
                    name="role"
                    placeholder="Software Developer"
                    value={experience.role}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        e
                      )
                    }
                  />

                </div>


                <div className="input-group">

                  <label>
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={experience.startDate}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        e
                      )
                    }
                  />

                </div>

              </div>


              <label className="checkbox">

                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={
                    experience.currentlyWorking
                  }
                  onChange={(e) =>
                    handleExperienceChange(
                      index,
                      e
                    )
                  }
                />

                <span>
                  Currently working here
                </span>

              </label>


              <div className="input-group">

                <label>
                  Job Description
                </label>

                <textarea
                  name="description"
                  placeholder="Describe your responsibilities, achievements and contributions..."
                  value={experience.description}
                  onChange={(e) =>
                    handleExperienceChange(
                      index,
                      e
                    )
                  }
                  rows="6"
                />

              </div>

            </div>

          )
        )}

      </section>


      {/* =====================================
          PROJECTS
      ====================================== */}

      <section className="portfolio-section">

        <div className="section-heading">

          <div>

            <span className="section-number">
              05
            </span>

            <h2>
              Projects
            </h2>

          </div>


          <button
            type="button"
            className="add-button"
            onClick={addProject}
          >
            + Add Project
          </button>

        </div>


        {portfolio.projects.length === 0 && (

          <div className="empty-state">

            <p>
              Showcase your best projects.
            </p>

          </div>

        )}


        {portfolio.projects.map(
          (project, index) => (

            <div
              className="dynamic-card"
              key={index}
            >

              <div className="card-header">

                <h3>
                  Project #{index + 1}
                </h3>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() =>
                    removeProject(index)
                  }
                >
                  Remove
                </button>

              </div>


              <div className="input-group">

                <label>
                  Project Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="AI Resume Builder"
                  value={project.name}
                  onChange={(e) =>
                    handleProjectChange(
                      index,
                      e
                    )
                  }
                />

              </div>


              <div className="input-group">

                <label>
                  Technologies
                </label>

                <input
                  type="text"
                  name="technologies"
                  placeholder="React, FastAPI, Python, MongoDB"
                  value={project.technologies}
                  onChange={(e) =>
                    handleProjectChange(
                      index,
                      e
                    )
                  }
                />

              </div>


              <div className="input-group">

                <label>
                  Project Description
                </label>

                <textarea
                  name="description"
                  placeholder="Describe what your project does, the technologies used and your contribution..."
                  value={project.description}
                  onChange={(e) =>
                    handleProjectChange(
                      index,
                      e
                    )
                  }
                  rows="6"
                />

              </div>


              <div className="form-grid">

                <div className="input-group">

                  <label>
                    GitHub URL
                  </label>

                  <input
                    type="url"
                    name="github"
                    placeholder="https://github.com/username/project"
                    value={project.github}
                    onChange={(e) =>
                      handleProjectChange(
                        index,
                        e
                      )
                    }
                  />

                </div>


                <div className="input-group">

                  <label>
                    Live Demo URL
                  </label>

                  <input
                    type="url"
                    name="liveDemo"
                    placeholder="https://yourproject.com"
                    value={project.liveDemo}
                    onChange={(e) =>
                      handleProjectChange(
                        index,
                        e
                      )
                    }
                  />

                </div>

              </div>

            </div>

          )
        )}

      </section>


      {/* =====================================
          FINAL ACTION
      ====================================== */}

      <div className="builder-footer">

        <div>

          <h3>
            Ready to see your portfolio?
          </h3>

          <p>
            Review your information and
            generate your live portfolio.
          </p>

        </div>


        <button
          type="button"
          className="preview-button"
          onClick={handlePreview}
        >
          Preview Portfolio

          <span>
            →
          </span>

        </button>

      </div>

    </div>
  );
}

export default PortfolioBuilder;
