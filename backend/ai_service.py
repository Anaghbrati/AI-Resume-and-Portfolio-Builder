import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai


BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY was not found in backend/.env")


client = genai.Client(api_key=api_key)


def improve_project(description):

    prompt = f"""
You are a professional technical resume writer.

Improve the following project description for a
software engineering resume.

Rules:
- Make it professional and concise.
- Use strong action verbs.
- Highlight technical work.
- Keep the information truthful.
- DO NOT invent technologies.
- DO NOT invent numbers or achievements.
- Make it suitable for an ATS-friendly resume.
- Return ONLY the improved project description.

Project description:

{description}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text


def improve_summary(summary):
    prompt = f"""
You are a professional resume writer.

Improve the following professional summary for a
software engineering resume.

Rules:
- Make it professional and concise.
- Keep it ATS-friendly.
- Use strong professional language.
- Highlight relevant technical strengths.
- Keep the information truthful.
- DO NOT invent technologies.
- DO NOT invent experience.
- DO NOT invent achievements or numbers.
- Write 3-4 sentences.
- Return ONLY the improved professional summary.

Current summary:

{summary}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text