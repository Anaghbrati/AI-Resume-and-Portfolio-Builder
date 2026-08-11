import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* ================= NAVBAR ================= */}
      <nav className="landing-navbar">

        <div
          className="landing-logo"
          onClick={() => navigate("/")}
        >
          <span>AI</span> Resume Studio
        </div>

        <div className="nav-links">
          <a href="#tools">Tools</a>
          <a href="#features">Features</a>
        </div>

        <button
          className="nav-button"
          onClick={() => navigate("/resume")}
        >
          Get Started
        </button>

      </nav>


      {/* ================= HERO ================= */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ AI-Powered Career Platform
          </div>

          <h1>
            Build Your
            <span> Professional Future</span>
          </h1>

          <p>
            Create an impressive resume, check your ATS score,
            and build a professional portfolio — all powered by AI.
          </p>

        </div>


        {/* ================= TOOLS ================= */}
        <div className="career-options" id="tools">

          {/* RESUME */}
          <div
            className="career-card"
            onClick={() => navigate("/resume")}
          >

            <div className="card-icon">
              📄
            </div>

            <div className="card-content">

              <h2>Resume Builder</h2>

              <p>
                Create a professional, ATS-friendly resume
                with AI-powered suggestions and improvements.
              </p>

            </div>

            <button>
              Build Resume →
            </button>

          </div>


          {/* ATS CHECKER */}
          <div
            className="career-card"
            onClick={() => navigate("/ats-checker")}
          >

            <div className="card-icon">
              🎯
            </div>

            <div className="card-content">

              <h2>ATS Checker</h2>

              <p>
                Analyze your resume, get an ATS score,
                and discover ways to improve your chances
                of getting shortlisted.
              </p>

            </div>

            <button>
              Check Resume →
            </button>

          </div>


          {/* PORTFOLIO */}
          <div
            className="career-card"
            onClick={() => navigate("/portfolio")}
          >

            <div className="card-icon">
              🌐
            </div>

            <div className="card-content">

              <h2>Portfolio Builder</h2>

              <p>
                Build a modern developer portfolio and
                showcase your skills, projects, experience,
                and achievements.
              </p>

            </div>

            <button>
              Build Portfolio →
            </button>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="features-section" id="features">

        <div className="section-heading">

          <span>WHY USE AI RESUME STUDIO?</span>

          <h2>
            Everything You Need to Stand Out
          </h2>

          <p>
            One platform to build, improve, and showcase
            your professional identity.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature">

            <div className="feature-icon">
              🤖
            </div>

            <h3>AI Powered</h3>

            <p>
              Get intelligent suggestions for your resume
              content using AI.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              🎯
            </div>

            <h3>ATS Friendly</h3>

            <p>
              Optimize your resume for Applicant Tracking
              Systems used by recruiters.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              ⚡
            </div>

            <h3>Fast & Simple</h3>

            <p>
              Build your professional profile quickly without
              complicated tools.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              🎨
            </div>

            <h3>Professional Templates</h3>

            <p>
              Choose clean and modern templates designed
              for professional use.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              📊
            </div>

            <h3>Resume Analysis</h3>

            <p>
              Understand what is working and what needs
              improvement in your resume.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              🚀
            </div>

            <h3>Career Ready</h3>

            <p>
              Create a professional presence that helps you
              stand out to recruiters.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="cta-section">

        <h2>
          Ready to Build Your Professional Profile?
        </h2>

        <p>
          Start creating your resume, checking your ATS score,
          or building your portfolio today.
        </p>

        <button
          onClick={() => navigate("/resume")}
        >
          Start Building →
        </button>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="landing-footer">

        <div className="landing-logo">
          <span>AI</span> Resume Studio
        </div>

        <p>
          Build smarter. Apply better. Stand out.
        </p>

        <p className="copyright">
          © 2026 AI Resume Studio. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default LandingPage;