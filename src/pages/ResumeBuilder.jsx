
import { useState } from "react";

import html2pdf from "html2pdf.js";
import PersonalInfo from "../components/PersonalInfo";
import Summary from "../components/Summary";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Hobbies from "../components/Hobbies";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";

import "./ResumeBuilder.css";

function ResumeBuilder() {
  const [template, setTemplate] = useState("professional");
  const [generating, setGenerating] = useState(false);

  // Resume state
  const [resume, setResume] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    },

    summary: "",

    education: [],

    skills: [],

    projects: [],

    experience: [],

    hobbies: "",
  });

  // ✨ Generate complete resume using AI
  const generateResumeWithAI = async () => {
    try {
      setGenerating(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/generate-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume: resume,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Resume generation failed"
        );
      }

      // Update the complete resume
      setResume(data.resume);

      alert("✨ Resume generated successfully!");
    } catch (error) {
      console.error("AI Resume Error:", error);

      alert(
        "Unable to generate resume. Please check your backend."
      );
    } finally {
      setGenerating(false);
    }
  };

  // Download Resume as PDF
const downloadPDF = async () => {
  const element = document.getElementById("resume-preview");

  if (!element) {
    alert("Resume preview not found.");
    return;
  }

  try {
    const name =
      resume.personal.name?.trim() || "My_Resume";

    const options = {
      margin: 0,

      filename: `${name.replace(/\s+/g, "_")}.pdf`,

      image: {
        type: "jpeg",
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },

      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    };

    await html2pdf()
      .set(options)
      .from(element)
      .save();

  } catch (error) {
    console.error("PDF generation failed:", error);

    alert("Failed to generate PDF.");
  }
};



  return (
    <div>
      <div className="header">
        <h1>AI Resume Builder</h1>
        <p>Create your professional resume with AI</p>
      </div>

      <div className="resume-layout">

        {/* LEFT SIDE */}
        <div className="form-container">

          <TemplateSelector
            template={template}
            setTemplate={setTemplate}
          />

          <PersonalInfo
            personal={resume.personal}
            setResume={setResume}
          />

          <Summary
            summary={resume.summary}
            setResume={setResume}
          />

          <Education
            education={resume.education}
            setResume={setResume}
          />

          <Skills
            skills={resume.skills}
            setResume={setResume}
          />

          <Hobbies
            hobbies={resume.hobbies}
            setResume={setResume}
          />

          <Projects
            projects={resume.projects}
            setResume={setResume}
          />

          <Experience
            experience={resume.experience}
            setResume={setResume}
          />

          {/* AI Resume Generator */}
          <button
            type="button"
            className="ai-button"
            onClick={generateResumeWithAI}
            disabled={generating}
          >
            {generating
              ? "✨ Generating Resume..."
              : "✨ Generate Resume with AI"}
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="preview-container">

          <div className="preview-header">
            <h2 className="preview-title">
              Live Resume Preview
            </h2>

            <button
              type="button"
              className="download-button"
              onClick={downloadPDF}
            >
              ↓ Download PDF
            </button>
          </div>

          <ResumePreview
            resume={resume}
            template={template}
          />

        </div>

      </div>
    </div>
  );
}

export default ResumeBuilder;

