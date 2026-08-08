from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai_service import improve_project, improve_summary


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://ai-resume-and-portfolio-builder-gamma.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProjectRequest(BaseModel):
    description: str


@app.get("/")
def home():
    return {
        "message": "AI Resume Builder Backend is running!"
    }


@app.get("/api/test")
def test():
    return {
        "success": True,
        "message": "FastAPI is working correctly"
    }


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
        print("AI ERROR:", repr(e))
        print("================================")

        return {
            "success": False,
            "message": str(e)
        }

        

    # except Exception as e:

    #     print("AI Error:", e)

    #     return {
    #         "success": False,
    #         "message": "AI improvement failed"
    #     }

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



# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel

# from ai_service import improve_project, improve_summary


# app = FastAPI()

# # ✅ Fixed CORS origins (NO trailing slashes)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "https://ai-resume-and-portfolio-builder-gamma.vercel.app",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# class ProjectRequest(BaseModel):
#     description: str


# class SummaryRequest(BaseModel):
#     summary: str


# @app.get("/")
# def home():
#     return {
#         "message": "AI Resume Builder Backend is running!"
#     }


# @app.get("/api/test")
# def test():
#     return {
#         "success": True,
#         "message": "FastAPI is working correctly"
#     }


# @app.post("/api/improve-project")
# def improve_project_api(data: ProjectRequest):
#     description = data.description.strip()

#     if not description:
#         return {
#             "success": False,
#             "message": "Project description is required"
#         }

#     try:
#         improved = improve_project(description)
#         return {
#             "success": True,
#             "original": description,
#             "improved": improved
#         }

#     except Exception as e:
#         print("================================")
#         print("AI ERROR:", repr(e))
#         print("================================")
#         return {
#             "success": False,
#             "message": str(e)
#         }


# @app.post("/api/improve-summary")
# def improve_summary_api(data: SummaryRequest):
#     summary = data.summary.strip()

#     if not summary:
#         return {
#             "success": False,
#             "message": "Summary is required"
#         }

#     try:
#         improved = improve_summary(summary)
#         return {
#             "success": True,
#             "original": summary,
#             "improved": improved
#         }

#     except Exception as e:
#         print("================================")
#         print("AI SUMMARY ERROR:", repr(e))
#         print("================================")
#         return {
#             "success": False,
#             "message": str(e)
#         }
