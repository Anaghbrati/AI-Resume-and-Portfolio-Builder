import { useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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

  const downloadPDF = async () => {
  const element = document.getElementById("resume-preview");

  if (!element) {
    alert("Resume preview not found.");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    // If resume fits on one page
    if (imgHeight <= pageHeight) {
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight
      );
    } else {
      // Scale the resume down so it fits on one page
      const scale = pageHeight / imgHeight;

      const finalWidth = imgWidth * scale;
      const finalHeight = imgHeight * scale;

      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      pdf.addImage(
        imgData,
        "PNG",
        x,
        y,
        finalWidth,
        finalHeight
      );
    }

    const name =
      resume.personal.name?.trim() || "My_Resume";

    pdf.save(
      `${name.replace(/\s+/g, "_")}.pdf`
    );

  } catch (error) {
    console.error("PDF generation failed:", error);

    alert("Failed to generate PDF.");
  }
};

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

  return (
    <div className="resume-builder">

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

          <button className="ai-button">
            ✨ Generate Resume with AI
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="preview-container">

          <div className="preview-header">
            <h2 className="preview-title">
              Live Resume Preview
            </h2>

            <button
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