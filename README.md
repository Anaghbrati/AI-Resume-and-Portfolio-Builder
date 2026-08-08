# 🤖 AI Resume & Portfolio Builder

An AI-powered resume builder that helps users create professional, ATS-friendly resumes using **React, FastAPI, and Google Gemini AI**.

Users can enter their personal information, education, skills, projects, experience, and hobbies. AI can improve individual sections or generate an improved resume automatically. The completed resume can also be exported as a PDF.

---

## ✨ Features

* 📝 Personal information management
* 🎓 Education section
* 💻 Skills section
* 🚀 Projects section
* 💼 Experience section
* 🧑‍💻 Professional summary
* 🎨 Multiple resume templates
* 🤖 AI-powered project description improvement
* 🤖 AI-powered experience description improvement
* 🤖 AI-powered professional summary improvement
* ✨ Generate complete resume with AI
* 👀 Live resume preview
* 📄 Download resume as PDF
* 🔗 Clickable LinkedIn, GitHub and project links
* ⚡ React + Vite frontend
* 🚀 FastAPI backend
* 🧠 Google Gemini API integration

---

# 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS
* html2pdf.js

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* python-dotenv
* Google GenAI SDK

### AI

* Google Gemini API

---

# 📁 Project Structure

```text
AI REMUME/
└── ai-resume-builder/
    ├── backend/
    │   ├── venv/                      # Python virtual environment
    │   ├── __pycache__/
    │   ├── .env                       # Environment variables (API keys)
    │   ├── .gitignore
    │   ├── ai_service.py              # Gemini API integration logic
    │   ├── example_env                # Template for environment variables
    │   ├── main.py                    # FastAPI application entry point
    │   └── requirements.txt           # Python dependencies
    ├── node_modules/                  # Frontend dependencies
    ├── public/                        # Public static assets
    ├── src/
    │   ├── assets/                    # Images, icons, etc.
    │   ├── components/                # React form and UI components
    │   │   ├── Education.jsx
    │   │   ├── Experience.jsx
    │   │   ├── Hobbies.jsx
    │   │   ├── PersonalInfo.jsx
    │   │   ├── Projects.jsx
    │   │   ├── ResumePreview.jsx
    │   │   ├── Skills.jsx
    │   │   ├── Summary.jsx
    │   │   └── TemplateSelector.jsx
    │   ├── pages/                     # Main page layouts
    │   │   ├── ResumeBuilder.css
    │   │   └── ResumeBuilder.jsx
    │   ├── App.css
    │   ├── App.jsx                    # Root React component
    │   ├── index.css
    │   └── main.jsx                   # React entry point
    ├── .env                           # Frontend environment variables
    ├── .gitignore
    ├── eslint.config.js
    └── index.html
```

---

# 📦 Dependencies

## Frontend Dependencies

The frontend uses:

```text
react
react-dom
html2pdf.js
```

### Install frontend dependencies

Navigate to the frontend directory:

```bash
cd frontend
```

If the project already has `package.json`:

```bash
npm install
```

Install the PDF dependency:

```bash
npm install html2pdf.js
```

If you are creating the project from scratch:

```bash
npm create vite@latest frontend
```

Select:

```text
React
JavaScript
```

Then:

```bash
cd frontend
npm install
npm install html2pdf.js
```

Run the frontend:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# 🐍 Backend Dependencies

The backend uses:

```text
fastapi
uvicorn
pydantic
python-dotenv
google-genai
```

Create a virtual environment:

```bash
cd backend
python -m venv venv
```

### Windows

Activate the virtual environment:

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install fastapi uvicorn pydantic python-dotenv google-genai
```

---

# 📄 requirements.txt

Create:

```text
backend/requirements.txt
```

Add:

```text
fastapi
uvicorn[standard]
pydantic
python-dotenv
google-genai
```

Then install everything using:

```bash
pip install -r requirements.txt
```

---

# 🔑 Gemini API Key Setup

The AI functionality requires a Google Gemini API key.

Create an API key using:

[Google AI Studio](https://aistudio.google.com/?utm_source=chatgpt.com)

Create:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Do **not** put your Gemini API key inside React/Vite.

Do **not** commit `.env` to GitHub.

---

# 🔒 .gitignore

Create a `.gitignore` file in the project root:

```gitignore
# Backend
backend/.env
backend/venv/
__pycache__/
*.pyc

# Frontend
frontend/node_modules/
frontend/dist/
frontend/.env

# Environment files
.env
.env.local
.env.production
```

---

# ⚙️ Frontend Environment Variable

For local development, create:

```text
frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Then in React:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";
```

For example:

```javascript
fetch(`${API_BASE_URL}/api/improve-summary`)
```

---

# 🚀 Running the Project Locally

You need **two terminals**.

## Terminal 1 — Backend

```bash
cd backend
```

Activate virtual environment:

```bash
venv\Scripts\activate
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

### Test Backend

```http
GET /
```

Returns:

```json
{
  "message": "AI Resume Builder Backend is running!"
}
```

---

### API Test

```http
GET /api/test
```

Returns:

```json
{
  "success": true,
  "message": "FastAPI is working correctly"
}
```

---

### Improve Project

```http
POST /api/improve-project
```

Request:

```json
{
  "description": "Built an expense tracker using React and MongoDB."
}
```

Response:

```json
{
  "success": true,
  "original": "Built an expense tracker using React and MongoDB.",
  "improved": "Developed an expense tracking application using React and MongoDB..."
}
```

---

### Improve Summary

```http
POST /api/improve-summary
```

Request:

```json
{
  "description": "I am a CSE student interested in software development."
}
```

---

### Improve Experience

```http
POST /api/improve-experience
```

Request:

```json
{
  "description": "Worked on frontend development using React."
}
```

---

### Generate Complete Resume

```http
POST /api/generate-resume
```

Request:

```json
{
  "resume": {
    "personal": {},
    "summary": "",
    "education": [],
    "skills": [],
    "projects": [],
    "experience": [],
    "hobbies": ""
  }
}
```

The AI processes the provided resume data and returns an improved resume.

---

# 🤖 AI Functionality

The project uses Gemini for four major AI features:

```text
Improve Project
       ↓
Gemini
       ↓
ATS-friendly project description
```

```text
Improve Summary
       ↓
Gemini
       ↓
Professional summary
```

```text
Improve Experience
       ↓
Gemini
       ↓
Professional experience description
```

```text
Generate Resume
       ↓
Gemini
       ↓
Complete improved resume
```

The AI prompts are designed to:

* Keep information truthful
* Avoid inventing technologies
* Avoid inventing achievements
* Avoid inventing numbers
* Use strong action verbs
* Improve ATS compatibility
* Maintain professional language

---

# 📄 PDF Generation

The project uses:

```text
html2pdf.js
```

to convert the resume preview into a PDF.

Because the resume contains HTML links such as:

```jsx
<a href={resume.personal.linkedin}>
  LinkedIn
</a>
```

and:

```jsx
<a href={resume.personal.github}>
  GitHub
</a>
```

the generated PDF can preserve clickable links.

---

# 🧪 Development Workflow

Recommended development order:

```text
1. Start FastAPI
        ↓
2. Start React
        ↓
3. Test /api/test
        ↓
4. Test Summary AI
        ↓
5. Test Project AI
        ↓
6. Test Experience AI
        ↓
7. Test Generate Resume AI
        ↓
8. Test PDF generation
        ↓
9. Test clickable links
```

---

# ⚠️ Gemini API Limits

Gemini API usage may be subject to rate limits and quotas.

If you receive errors such as:

```text
429
RESOURCE_EXHAUSTED
Quota exceeded
Rate limit exceeded
```

you have likely reached the API quota or rate limit.

Avoid repeatedly clicking AI buttons while testing.

Check your API usage in:

[Google AI Studio](https://aistudio.google.com/?utm_source=chatgpt.com)

---

# 🔐 Security

Never expose:

```text
GEMINI_API_KEY
```

in frontend code.

❌ Do not do:

```javascript
const API_KEY = "your-gemini-api-key";
```

✅ Instead:

```text
React
  ↓
FastAPI
  ↓
Gemini API
```

The Gemini API key stays inside:

```text
backend/.env
```

---

# 📌 Future Improvements

Possible future features:

* 📊 AI Resume Score
* 🎯 Job Description matching
* 🔍 ATS compatibility checker
* 📝 AI cover letter generator
* 💼 Portfolio generator
* 📈 Skill gap analysis
* 🎨 More resume templates
* 📥 Resume upload and analysis
* 🔗 LinkedIn profile analysis
* 📱 Responsive mobile design
* 🌐 Deployment
* 🔐 User authentication
* 💾 Save resumes
* 📚 Multiple resume versions

---

# 👨‍💻 Author

**Anaghbrati Sinha Ray**

B.Tech Computer Science Engineering

Built using React, FastAPI, Python and Google Gemini AI.

---

# ⭐ Project Goal

The goal of this project is to make resume creation easier by combining a traditional resume builder with generative AI.

Users provide their real information, while AI helps transform that information into clear, professional and ATS-friendly resume content without inventing qualifications or achievements.

```
```
