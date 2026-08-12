import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PortfolioBuilder.css";

function PortfolioPreview() {
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);

  // ==========================================
  // LOAD PORTFOLIO DATA
  // ==========================================

  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData");

    if (!savedData) {
      return;
    }

    try {
      const parsedData = JSON.parse(savedData);

      setPortfolio(parsedData);
    } catch (error) {
      console.error(
        "Failed to load portfolio data:",
        error
      );
    }
  }, []);

  // ==========================================
  // DOWNLOAD / PRINT
  // ==========================================

  const handleDownload = () => {
    window.print();
  };

  // ==========================================
  // FORMAT EXPERIENCE DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          month: "long",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  // ==========================================
  // NO DATA
  // ==========================================

  if (!portfolio) {
    return (
      <div className="portfolio-no-data">

        <div className="no-data-card">

          <div className="no-data-icon">
            📁
          </div>

          <h1>
            No Portfolio Data Found
          </h1>

          <p>
            Please complete your portfolio
            details first.
          </p>

          <button
            type="button"
            className="preview-button"
            onClick={() =>
              navigate("/portfolio-builder")
            }
          >
            ← Go to Portfolio Builder
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="portfolio-preview-page">

      {/* =================================================
          TOP NAVIGATION
      ================================================= */}

      <header className="preview-topbar">

        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/portfolio-builder")
          }
        >
          ← Edit Portfolio
        </button>

        <div className="preview-title">
          <span>LIVE</span>
          Portfolio Preview
        </div>

        <button
          type="button"
          className="download-button"
          onClick={handleDownload}
        >
          📥 Download
        </button>

      </header>


      {/* =================================================
          MAIN PORTFOLIO
      ================================================= */}

      <main className="live-portfolio">


        {/* =================================================
            HERO SECTION
        ================================================= */}

        <section className="portfolio-hero">

          <div className="hero-background-circle circle-one"></div>

          <div className="hero-background-circle circle-two"></div>

          <div className="hero-content">

            <p className="hero-label">
              HELLO, I'M
            </p>

            <h1>
              {portfolio.name ||
                "Your Name"}
            </h1>

            <h2>
              {portfolio.jobTitle ||
                "Your Professional Title"}
            </h2>

            {portfolio.location && (
              <p className="hero-location">
                📍 {portfolio.location}
              </p>
            )}

            <div className="hero-contact">

              {portfolio.email && (
                <a
                  href={`mailto:${portfolio.email}`}
                >
                  ✉ {portfolio.email}
                </a>
              )}

              {portfolio.phone && (
                <a
                  href={`tel:${portfolio.phone}`}
                >
                  ☎ {portfolio.phone}
                </a>
              )}

            </div>

          </div>

        </section>


        {/* =================================================
            ABOUT ME
        ================================================= */}

        {portfolio.about && (

          <section className="preview-section">

            <div className="preview-section-title">

              <span>
                01
              </span>

              <h2>
                About Me
              </h2>

            </div>

            <div className="about-container">

              <p className="about-text">
                {portfolio.about}
              </p>

            </div>

          </section>

        )}


        {/* =================================================
            SKILLS
        ================================================= */}

        {portfolio.skills &&
          portfolio.skills.length > 0 && (

            <section className="preview-section">

              <div className="preview-section-title">

                <span>
                  02
                </span>

                <h2>
                  Skills
                </h2>

              </div>

              <div className="preview-skills">

                {portfolio.skills.map(
                  (skill, index) => (

                    <span
                      className="preview-skill"
                      key={index}
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </section>

          )}


        {/* =================================================
            EDUCATION
        ================================================= */}

        {portfolio.education &&
          portfolio.education.length > 0 && (

            <section className="preview-section">

              <div className="preview-section-title">

                <span>
                  03
                </span>

                <h2>
                  Education
                </h2>

              </div>


              <div className="preview-timeline">

                {portfolio.education.map(
                  (education, index) => (

                    <article
                      className="preview-card"
                      key={index}
                    >

                      <div className="card-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </div>


                      <div className="card-content">

                        <h3>
                          {education.degree ||
                            "Degree"}
                        </h3>

                        <h4>
                          {education.college ||
                            "College / University"}
                        </h4>


                        {(education.startYear ||
                          education.endYear) && (

                          <p className="date">

                            {education.startYear ||
                              "Start"}

                            {" — "}

                            {education.endYear ||
                              "Present"}

                          </p>

                        )}


                        {education.percentage && (

                          <p className="result">

                            <strong>
                              Percentage / CGPA:
                            </strong>{" "}

                            {education.percentage}

                          </p>

                        )}

                      </div>

                    </article>

                  )
                )}

              </div>

            </section>

          )}


        {/* =================================================
            EXPERIENCE
        ================================================= */}

        {portfolio.experience &&
          portfolio.experience.length > 0 && (

            <section className="preview-section">

              <div className="preview-section-title">

                <span>
                  04
                </span>

                <h2>
                  Experience
                </h2>

              </div>


              <div className="preview-timeline">

                {portfolio.experience.map(
                  (experience, index) => (

                    <article
                      className="preview-card"
                      key={index}
                    >

                      <div className="card-number">

                        {String(
                          index + 1
                        ).padStart(2, "0")}

                      </div>


                      <div className="card-content">

                        <h3>
                          {experience.role ||
                            "Job Role"}
                        </h3>

                        <h4>
                          {experience.company ||
                            "Company"}
                        </h4>


                        {experience.startDate && (

                          <p className="date">

                            Started:{" "}

                            {formatDate(
                              experience.startDate
                            )}

                          </p>

                        )}


                        {experience.currentlyWorking && (

                          <span className="current-badge">
                            ● Currently Working
                          </span>

                        )}


                        {experience.description && (

                          <p className="experience-description">
                            {experience.description}
                          </p>

                        )}

                      </div>

                    </article>

                  )
                )}

              </div>

            </section>

          )}


        {/* =================================================
            PROJECTS
        ================================================= */}

        {portfolio.projects &&
          portfolio.projects.length > 0 && (

            <section className="preview-section">

              <div className="preview-section-title">

                <span>
                  05
                </span>

                <h2>
                  Projects
                </h2>

              </div>


              <div className="preview-projects">

                {portfolio.projects.map(
                  (project, index) => (

                    <article
                      className="preview-project-card"
                      key={index}
                    >

                      <div className="project-number">

                        {String(
                          index + 1
                        ).padStart(2, "0")}

                      </div>


                      <h3>
                        {project.name ||
                          "Project Name"}
                      </h3>


                      {project.technologies && (

                        <p className="project-tech">
                          {project.technologies}
                        </p>

                      )}


                      {project.description && (

                        <p className="project-description">
                          {project.description}
                        </p>

                      )}


                      <div className="project-links">

                        {project.github && (

                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub ↗
                          </a>

                        )}


                        {project.liveDemo && (

                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo ↗
                          </a>

                        )}

                      </div>

                    </article>

                  )
                )}

              </div>

            </section>

          )}


        {/* =================================================
            CONTACT
        ================================================= */}

        

        {/* =================================================
            FOOTER
        ================================================= */}

        

      </main>

    </div>
  );
}

export default PortfolioPreview;