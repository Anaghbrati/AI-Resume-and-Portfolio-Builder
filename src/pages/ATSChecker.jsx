import { useState } from "react";
import "./ATSchecker.css";

function ATSchecker() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Handle PDF selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setError("");
    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Check PDF
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      setFile(null);
      return;
    }

    // Optional: 10 MB limit
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // Send PDF to FastAPI
  const checkATS = async () => {
    if (!file) {
      setError("Please upload your resume PDF first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/api/ats-check",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "ATS analysis failed."
        );
      }

      setResult(data.result);
    } catch (err) {
      console.error("ATS Error:", err);

      setError(
        err.message ||
          "Unable to analyze the resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset everything
  const resetChecker = () => {
    setFile(null);
    setResult(null);
    setError("");

    // Reset file input
    const input = document.getElementById("resume-upload");

    if (input) {
      input.value = "";
    }
  };

  return (
    <div className="ats-checker-container">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="ats-header">
        <h1>ATS Resume Checker</h1>

        <p>
          Upload your resume and let AI analyze its
          ATS compatibility.
        </p>
      </div>


      {/* ================================= */}
      {/* UPLOAD CARD */}
      {/* ================================= */}

      <div className="ats-upload-card">

        <div className="upload-icon">
          📄
        </div>

        <h2>Upload Your Resume</h2>

        <p>
          Upload your resume in PDF format.
          Maximum size: 10 MB.
        </p>

        <label
          htmlFor="resume-upload"
          className="ats-upload-button"
        >
          Choose PDF
        </label>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />


        {/* Selected file */}

        {file && (
          <div className="selected-file">

            <span className="file-icon">
              📄
            </span>

            <div className="file-info">
              <strong>{file.name}</strong>

              <small>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </small>
            </div>

          </div>
        )}


        {/* Error */}

        {error && (
          <div className="ats-error">
            ⚠️ {error}
          </div>
        )}


        {/* Analyze button */}

        <button
          type="button"
          className="analyze-button"
          onClick={checkATS}
          disabled={!file || loading}
        >
          {loading
            ? "✨ Analyzing Resume..."
            : "✨ Check ATS Score"}
        </button>

      </div>


      {/* ================================= */}
      {/* LOADING */}
      {/* ================================= */}

      {loading && (
        <div className="ats-loading">

          <div className="loading-spinner"></div>

          <h3>Analyzing your resume...</h3>

          <p>
            AI is checking your resume structure,
            keywords, skills and ATS compatibility.
          </p>

        </div>
      )}


      {/* ================================= */}
      {/* RESULTS */}
      {/* ================================= */}

      {result && !loading && (
        <div className="ats-results">

          <div className="results-header">
            <h2>ATS Analysis Results</h2>

            <button
              type="button"
              className="reset-button"
              onClick={resetChecker}
            >
              Check Another Resume
            </button>
          </div>


          {/* ============================= */}
          {/* SCORE */}
          {/* ============================= */}

          <div className="ats-score-card">

            <div className="score-circle">

              <span className="score-number">
                {result.score}
              </span>

              <span className="score-total">
                /100
              </span>

            </div>

            <div className="score-content">

              <h3>ATS Score</h3>

              <p>
                {result.summary}
              </p>

            </div>

          </div>


          {/* ============================= */}
          {/* STRENGTHS */}
          {/* ============================= */}

          <div className="ats-result-card">

            <h3>
              ✅ Strengths
            </h3>

            {result.strengths &&
            result.strengths.length > 0 ? (

              <ul>
                {result.strengths.map(
                  (strength, index) => (
                    <li key={index}>
                      {strength}
                    </li>
                  )
                )}
              </ul>

            ) : (
              <p>No strengths found.</p>
            )}

          </div>


          {/* ============================= */}
          {/* IMPROVEMENTS */}
          {/* ============================= */}

          <div className="ats-result-card">

            <h3>
              ⚡ Improvements
            </h3>

            {result.improvements &&
            result.improvements.length > 0 ? (

              <ul>
                {result.improvements.map(
                  (improvement, index) => (
                    <li key={index}>
                      {improvement}
                    </li>
                  )
                )}
              </ul>

            ) : (
              <p>No improvements suggested.</p>
            )}

          </div>


          {/* ============================= */}
          {/* KEYWORDS */}
          {/* ============================= */}

          <div className="ats-result-card">

            <h3>
              🔑 Recommended Keywords
            </h3>

            {result.keywords &&
            result.keywords.length > 0 ? (

              <div className="keyword-container">

                {result.keywords.map(
                  (keyword, index) => (
                    <span
                      className="keyword"
                      key={index}
                    >
                      {keyword}
                    </span>
                  )
                )}

              </div>

            ) : (
              <p>No keyword suggestions.</p>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default ATSchecker;