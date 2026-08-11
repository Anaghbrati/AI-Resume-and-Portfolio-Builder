import os
import tempfile

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai_service import (
    improve_project,
    improve_summary,
    improve_experience,
    generate_resume,
    check_ats,
)


# ========================================
# FASTAPI APP
# ========================================

app = FastAPI(
    title="AI Resume & Portfolio Builder API",
    version="1.0.0"
)


# ========================================
# CORS
# ========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ========================================
# REQUEST MODELS
# ========================================

class ProjectRequest(BaseModel):
    description: str


class ResumeRequest(BaseModel):
    resume: dict


# ========================================
# HOME
# ========================================

@app.get("/")
def home():

    return {
        "message": "AI Resume Builder Backend is running!"
    }


# ========================================
# TEST API
# ========================================

@app.get("/api/test")
def test():

    return {
        "success": True,
        "message": "FastAPI is working correctly"
    }


# ========================================
# IMPROVE PROJECT
# ========================================

@app.post("/api/improve-project")
def improve_project_api(data: ProjectRequest):

    description = data.description.strip()

    if not description:

        return {
            "success": False,
            "message": "Project description is required"
        }

    try:

        improved = improve_project(description)

        return {
            "success": True,
            "original": description,
            "improved": improved
        }

    except Exception as e:

        print("================================")
        print("AI PROJECT ERROR:", repr(e))
        print("================================")

        return {
            "success": False,
            "message": str(e)
        }


# ========================================
# IMPROVE SUMMARY
# ========================================

@app.post("/api/improve-summary")
def improve_summary_api(data: ProjectRequest):

    summary = data.description.strip()

    if not summary:

        return {
            "success": False,
            "message": "Summary is required"
        }

    try:

        improved = improve_summary(summary)

        return {
            "success": True,
            "original": summary,
            "improved": improved
        }

    except Exception as e:

        print("================================")
        print("AI SUMMARY ERROR:", repr(e))
        print("================================")

        return {
            "success": False,
            "message": str(e)
        }


# ========================================
# IMPROVE EXPERIENCE
# ========================================

@app.post("/api/improve-experience")
def improve_experience_api(data: ProjectRequest):

    description = data.description.strip()

    if not description:

        return {
            "success": False,
            "message": "Experience description is required"
        }

    try:

        improved = improve_experience(description)

        return {
            "success": True,
            "original": description,
            "improved": improved
        }

    except Exception as e:

        print("================================")
        print("AI EXPERIENCE ERROR:", repr(e))
        print("================================")

        return {
            "success": False,
            "message": str(e)
        }


# ========================================
# GENERATE COMPLETE RESUME
# ========================================

@app.post("/api/generate-resume")
def generate_resume_api(data: ResumeRequest):

    try:

        improved_resume = generate_resume(
            data.resume
        )

        return {
            "success": True,
            "resume": improved_resume
        }

    except Exception as e:

        print("================================")
        print("AI RESUME ERROR:", repr(e))
        print("================================")

        return {
            "success": False,
            "message": str(e)
        }


# ========================================
# ATS RESUME CHECKER
# ========================================

@app.post("/api/ats-check")
async def ats_check_api(
    file: UploadFile = File(...)
):

    # ----------------------------------------
    # Validate filename
    # ----------------------------------------

    if not file.filename:

        return {
            "success": False,
            "message": "Please upload a resume PDF."
        }


    # ----------------------------------------
    # Validate file type
    # ----------------------------------------

    if file.content_type != "application/pdf":

        return {
            "success": False,
            "message": "Only PDF files are allowed."
        }


    temp_path = None


    try:

        # ----------------------------------------
        # Read uploaded PDF
        # ----------------------------------------

        contents = await file.read()


        if not contents:

            return {
                "success": False,
                "message": "The uploaded PDF is empty."
            }


        # ----------------------------------------
        # Create temporary PDF
        # ----------------------------------------

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp_file:

            temp_file.write(contents)

            temp_path = temp_file.name


        print("================================")
        print("ATS FILE:", file.filename)
        print("TEMP PATH:", temp_path)
        print("================================")


        # ----------------------------------------
        # Send PDF to Gemini
        # ----------------------------------------

        result = check_ats(temp_path)


        # ----------------------------------------
        # Return result
        # ----------------------------------------

        return {
            "success": True,
            "filename": file.filename,
            "result": result
        }


    except Exception as e:

        print("================================")
        print("ATS ERROR:", repr(e))
        print("================================")

        return {
            "success": False,
            "message": str(e)
        }


    finally:

        # ----------------------------------------
        # Delete temporary PDF
        # ----------------------------------------

        if temp_path and os.path.exists(temp_path):

            os.remove(temp_path)