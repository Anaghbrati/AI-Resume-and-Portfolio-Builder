import { useNavigate } from "react-router-dom";
// import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      <div className="landing-content">

        <h1>
          Build Your Career
          <span> With AI</span>
        </h1>

        <p>
          Create a professional resume, check your ATS score,
          or build your portfolio with AI.
        </p>

        <div className="landing-options">

          <div
            className="option-card"
            onClick={() => navigate("/resume")}
          >
            <div className="option-icon">📄</div>

            <h2>Resume Builder</h2>

            <p>
              Create an ATS-friendly resume
              with AI-powered improvements.
            </p>

            <button>
              Build Resume →
            </button>
          </div>


          <div
            className="option-card"
            onClick={() => navigate("/ats-checker")}
          >
            <div className="option-icon">📊</div>

            <h2>ATS Checker</h2>

            <p>
              Upload your resume and get an
              AI-powered ATS score and feedback.
            </p>

            <button>
              Check Resume →
            </button>
          </div>


          <div
            className="option-card"
            onClick={() => navigate("/portfolio")}
          >
            <div className="option-icon">💼</div>

            <h2>Portfolio Builder</h2>

            <p>
              Build a professional developer
              portfolio to showcase your work.
            </p>

            <button>
              Build Portfolio →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default LandingPage;