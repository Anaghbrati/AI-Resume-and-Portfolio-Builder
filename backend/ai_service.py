
import os
import json
from pathlib import Path

from dotenv import load_dotenv
from google import genai


BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY was not found in backend/.env")


client = genai.Client(api_key=api_key)


# --------------------------------
# Improve Project
# --------------------------------

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


# --------------------------------
# Improve Summary
# --------------------------------

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


# --------------------------------
# Improve Experience
# --------------------------------

def improve_experience(description):

    prompt = f"""
You are a professional resume writer.

Improve the following work experience description
for a software engineering resume.

Rules:
- Make it professional and concise.
- Use strong action verbs.
- Highlight technical responsibilities.
- Make it ATS-friendly.
- Keep the information truthful.
- DO NOT invent technologies.
- DO NOT invent achievements.
- DO NOT invent numbers.
- DO NOT invent responsibilities.
- Return ONLY the improved experience description.

Experience description:

{description}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text


# --------------------------------
# Generate Complete Resume
# --------------------------------

def generate_resume(resume):

    prompt = f"""
You are a professional ATS-friendly resume writer.

Improve the following resume while preserving ALL
factual information.

IMPORTANT RULES:

- Keep all information truthful.
- DO NOT invent companies.
- DO NOT invent technologies.
- DO NOT invent achievements.
- DO NOT invent numbers.
- DO NOT invent dates.
- DO NOT invent education.
- DO NOT invent experience.
- DO NOT invent projects.
- Improve grammar and professional wording.
- Use strong action verbs.
- Make the summary concise and professional.
- Improve project descriptions.
- Improve experience descriptions.
- Keep GitHub, LinkedIn and other URLs unchanged.
- Keep names, dates and contact information unchanged.
- Do not remove valid information.
- Return ONLY valid JSON.
- Do NOT return markdown.
- Do NOT use ```json.

Return exactly this structure:

{{
    "personal": {{
        "name": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "github": ""
    }},
    "summary": "",
    "education": [],
    "skills": [],
    "projects": [],
    "experience": [],
    "hobbies": ""
}}

Resume:

{json.dumps(resume)}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    result = response.text.strip()

    # Remove markdown code fences if Gemini adds them
    if result.startswith("```json"):
        result = result[7:]

    if result.startswith("```"):
        result = result[3:]

    if result.endswith("```"):
        result = result[:-3]

    result = result.strip()

    return json.loads(result)

