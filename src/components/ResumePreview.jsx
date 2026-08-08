function ResumePreview({ resume, template }) {
  const {
    personal,
    summary,
    education,
    skills,
    projects,
    experience,
  } = resume;

  return (
    <div
        id="resume-preview"
        className={`resume-preview ${template}-template`}
>

      {/* HEADER */}
      <header className="resume-header">

        <h1>
          {personal.name || "YOUR NAME"}
        </h1>

        <div className="contact-info">
          {personal.email && <span>{personal.email}</span>}

          {personal.phone && <span>{personal.phone}</span>}

          {personal.location && (
            <span>{personal.location}</span>
          )}
        </div>

        <div className="contact-links">
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )}

          {personal.github && (
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
        </div>

      </header>


      {/* SUMMARY */}
      {summary && (
        <section className="resume-section">

          <h2>PROFESSIONAL SUMMARY</h2>

          <p className="summary-text">
            {summary}
          </p>

        </section>
      )}


      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="resume-section">

          <h2>EDUCATION</h2>

          {education.map((edu, index) => (
            <div
              className="resume-entry"
              key={index}
            >

              <div className="entry-top">

                <div>
                  <h3>
                    {edu.degree}
                    {edu.field &&
                      ` in ${edu.field}`}
                  </h3>

                  <p className="organization">
                    {edu.institution}
                  </p>
                </div>

                <div className="entry-date">
                  {edu.startYear}

                  {edu.endYear &&
                    ` – ${edu.endYear}`}
                </div>

              </div>

              {edu.cgpa && (
                <p className="secondary-text">
                  CGPA / Percentage: {edu.cgpa}
                </p>
              )}

            </div>
          ))}

        </section>
      )}


      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className="resume-section">

          <h2>EXPERIENCE</h2>

          {experience.map((exp, index) => (
            <div
              className="resume-entry"
              key={index}
            >

              <div className="entry-top">

                <div>

                  <h3>
                    {exp.role}
                  </h3>

                  <p className="organization">
                    {exp.company}

                    {exp.location &&
                      ` | ${exp.location}`}
                  </p>

                </div>

                <div className="entry-date">

                  {exp.startDate}

                  {exp.endDate &&
                    ` – ${exp.endDate}`}

                </div>

              </div>

              {exp.description && (
                <p className="description">
                  {exp.description}
                </p>
              )}

            </div>
          ))}

        </section>
      )}


      {/* PROJECTS */}
      {projects.length > 0 && (
        <section className="resume-section">

          <h2>PROJECTS</h2>

          {projects.map((project, index) => (
            <div
              className="resume-entry"
              key={index}
            >

              <div className="entry-top">

                <div>

                  <h3>
                    {project.name}
                  </h3>

                  {project.technologies && (
                    <p className="technologies">
                      {project.technologies}
                    </p>
                  )}

                </div>

              </div>

              {project.description && (
                <p className="description">
                  {project.description}
                </p>
              )}

              {(project.github ||
                project.liveDemo) && (

                <div className="project-links">

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  )}

                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                  )}

                </div>
              )}

            </div>
          ))}

        </section>
      )}


      {/* SKILLS */}
      {skills.length > 0 && (
        <section className="resume-section">

          <h2>TECHNICAL SKILLS</h2>

          <div className="skills-grid">

            {skills.map((skill, index) => (
              <span key={index}>
                {skill}
              </span>
            ))}

          </div>

        </section>
      )}
      {resume.hobbies && (
        <section className="resume-section">
            <h2>HOBBIES & INTERESTS</h2>

            <div className="hobbies-list">
            {resume.hobbies
                .split(",")
                .map((hobby, index) => (
                <span key={index}>
                    {hobby.trim()}
                </span>
                ))}
            </div>
        </section>
        )}

    </div>
  );
}

export default ResumePreview;