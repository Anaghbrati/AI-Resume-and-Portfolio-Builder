
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai_service import (
    improve_project,
    improve_summary,
    improve_experience,
    generate_resume,
)


app = FastAPI()


# --------------------------------
# CORS
# --------------------------------

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


# --------------------------------
# Request Models
# --------------------------------

class ProjectRequest(BaseModel):
    description: str


class ResumeRequest(BaseModel):
    resume: dict


# --------------------------------
# Home
# --------------------------------

@app.get("/")
def home():
    return {
        "message": "AI Resume Builder Backend is running!"
    }


# --------------------------------
# Test API
# --------------------------------

@app.get("/api/test")
def test():
    return {
        "success": True,
        "message": "FastAPI is working correctly"
    }


# --------------------------------
# Improve Project
# --------------------------------

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


# --------------------------------
# Improve Summary
# --------------------------------

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


# --------------------------------
# Improve Experience
# --------------------------------

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


# --------------------------------
# Generate Complete Resume
# --------------------------------

@app.post("/api/generate-resume")
def generate_resume_api(data: ResumeRequest):

    try:

        improved_resume = generate_resume(data.resume)

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

