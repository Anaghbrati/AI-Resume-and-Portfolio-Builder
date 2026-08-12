# 🤖 AI Resume & Portfolio Builder

An AI-powered resume builder that helps users create professional, ATS-friendly resumes using **React, FastAPI, Python, and Google Gemini AI**.

Users can enter their personal information, education, skills, projects, work experience, and hobbies. Gemini AI can improve individual resume sections or generate an improved complete resume. The finished resume can also be downloaded as a PDF with clickable links.

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
* ✨ AI-powered complete resume generation
* 👀 Live resume preview
* 📄 Download resume as PDF
* 🔗 Clickable LinkedIn links
* 🔗 Clickable GitHub links
* 🔗 Clickable project/live-demo links
* ⚡ React + Vite frontend
* 🚀 FastAPI backend
* 🧠 Google Gemini API integration

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* JavaScript
* HTML
* CSS
* html2canvas
* jsPDF

## Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* python-dotenv
* Google GenAI SDK

## AI

* Google Gemini API

---

# 📁 Project Structure

```text
AI-Resume-and-Portfolio-Builder/
│
├── backend/
│   ├── ai_service.py
│   ├── ats_service.py
│   ├── example_env
│   ├── main.py
│   └── requirements.txt
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Hobbies.jsx
│   │   ├── Navbar.jsx
│   │   ├── PersonalInfo.jsx
│   │   ├── Projects.jsx
│   │   ├── ResumePreview.jsx
│   │   ├── Skills.jsx
│   │   ├── Summary.jsx
│   │   └── TemplateSelector.jsx
│   │
│   ├── pages/
│   │   ├── data/
│   │   ├── ATSchecker.css
│   │   ├── ATSchecker.jsx
│   │   ├── LandingPage.css
│   │   ├── LandingPage.jsx
│   │   ├── PortfolioBuilder.css
│   │   ├── PortfolioBuilder.jsx
│   │   ├── PortfolioPreview.css
│   │   ├── PortfolioPreview.jsx
│   │   ├── ResumeBuilder.css
│   │   └── ResumeBuilder.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── example_env
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── vite.config.js
```

---

# 📦 Dependencies

## Frontend Dependencies

The frontend uses:

```text
react
react-dom
html2canvas
jspdf
```

You can check the installed dependencies in:

```text
package.json
```

### Install frontend dependencies

From the project root:

```bash
npm install
```

Install the required PDF libraries:

```bash
npm install html2canvas jspdf
```

If React/Vite has not been installed yet:

```bash
npm install react react-dom
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

---

# 📄 Backend requirements.txt

Create/update:

```text
backend/requirements.txt
```

with:

```text
fastapi
uvicorn[standard]
pydantic
python-dotenv
google-genai
```

Then install them:

```bash
cd backend
pip install -r requirements.txt
```

---

# 🐍 Create Python Virtual Environment

From the project root:

```bash
cd backend
```

Create the virtual environment:

```bash
python -m venv venv
```

### Windows

Activate it:

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Then install dependencies:

```bash
pip install -r requirements.txt
```
```bash
python.exe -m pip install --upgrade pip
```
---

# 🔑 Gemini API Key Setup

This project uses Google Gemini for AI-powered resume improvement.

Create a Gemini API key through Google AI Studio.

[Google AI Studio](https://aistudio.google.com/?utm_source=chatgpt.com)

Create:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Example:

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
```

**Never commit your API key to GitHub.**

---

# ⚙️ Frontend Environment Variable

Your React frontend can use an environment variable to determine the backend URL.

Create:

```text
.env
```

in the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Your React components can then use:

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

# 🔒 .gitignore

Make sure your root `.gitignore` contains:

```gitignore
# Dependencies
node_modules/

# Build
dist/

# Environment variables
.env
.env.local
.env.production

# Python
backend/venv/
backend/__pycache__/
backend/*.pyc

# Backend environment
backend/.env

# Python cache
__pycache__/
*.pyc
```

---

# 🚀 Running the Project Locally

The project requires **two terminals**.

---

## Terminal 1 — Start Backend

Open a terminal and run:

```bash
cd backend
```

Activate the virtual environment:

```bash
venv\Scripts\activate
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Terminal 2 — Start Frontend

From the project root:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

## Backend Health Check

```http
GET /
```

Response:

```json
{
  "message": "AI Resume Builder Backend is running!"
}
```

---

## API Test

```http
GET /api/test
```

Response:

```json
{
  "success": true,
  "message": "FastAPI is working correctly"
}
```

---

## 🤖 Improve Project

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

## 🤖 Improve Summary

```http
POST /api/improve-summary
```

Request:

```json
{
  "description": "I am a CSE student interested in software development."
}
```

The Gemini model improves the summary while keeping the information truthful.

---

## 🤖 Improve Experience

```http
POST /api/improve-experience
```

Request:

```json
{
  "description": "Worked on frontend development using React."
}
```

The AI converts the description into professional, ATS-friendly resume content.

---

## ✨ Generate Complete Resume

```http
POST /api/generate-resume
```

Request:

```json
{
  "resume": {
    "personal": {
      "name": "",
      "email": "",
      "phone": "",
      "location": "",
      "linkedin": "",
      "github": ""
    },
    "summary": "",
    "education": [],
    "skills": [],
    "projects": [],
    "experience": [],
    "hobbies": ""
  }
}
```

The backend sends the resume information to Gemini and returns an improved resume.

---

# 🧠 AI Architecture

The application follows this structure:

```text
                 React Frontend
                       │
                       │ HTTP Request
                       ▼
                 FastAPI Backend
                       │
                       ▼
                ai_service.py
                       │
                       ▼
                 Gemini API
                       │
                       ▼
              Improved Resume Data
                       │
                       ▼
                 React Frontend
                       │
                       ▼
                Resume Preview
```

---

# 🤖 AI Features

## Improve Project

```text
Project Description
        ↓
Improve with AI
        ↓
FastAPI
        ↓
Gemini
        ↓
Professional Project Description
```

---

## Improve Summary

```text
Professional Summary
        ↓
Improve with AI
        ↓
FastAPI
        ↓
Gemini
        ↓
ATS-Friendly Summary
```

---

## Improve Experience

```text
Experience Description
        ↓
Improve with AI
        ↓
FastAPI
        ↓
Gemini
        ↓
Professional Experience Description
```

---

## Generate Complete Resume

```text
User Resume Data
        ↓
Generate Resume with AI
        ↓
FastAPI
        ↓
Gemini
        ↓
Improved Resume
        ↓
Live Resume Preview
```

---

# 📄 PDF Generation

The project uses:

```text
html2canvas
```

and:

```text
jsPDF
```

to generate the resume PDF.

The process is:

```text
Resume Preview
      ↓
html2canvas
      ↓
Canvas/Image
      ↓
jsPDF
      ↓
PDF
```

The resume can include clickable:

* LinkedIn
* GitHub
* Live Demo
* Project URLs

---

# 🧪 Testing the Backend

After starting FastAPI, open:

```text
http://127.0.0.1:8000/docs
```

You can test all API endpoints directly through Swagger UI.

Recommended testing order:

```text
1. GET /
        ↓
2. GET /api/test
        ↓
3. POST /api/improve-summary
        ↓
4. POST /api/improve-project
        ↓
5. POST /api/improve-experience
        ↓
6. POST /api/generate-resume
```

---

# ⚠️ Gemini API Limits

Gemini API usage may have rate limits or quotas.

You may receive errors such as:

```text
429
RESOURCE_EXHAUSTED
Quota exceeded
Rate limit exceeded
```

This generally means the API quota or rate limit has been reached.

Avoid repeatedly clicking the AI buttons while testing.

You can check your Gemini API usage through:

[Google AI Studio](https://aistudio.google.com/?utm_source=chatgpt.com)

---

# 🔐 Security

The Gemini API key must remain on the backend.

### ❌ Do not put the key in React

```javascript
const API_KEY = "YOUR_GEMINI_API_KEY";
```

### ✅ Keep it in

```text
backend/.env
```

The intended architecture is:

```text
React
  │
  │ API Request
  ▼
FastAPI
  │
  │ API Key
  ▼
Gemini API
```

This prevents exposing the Gemini API key in the browser.

---

# 💻 Useful Commands

## Install frontend dependencies

```bash
npm install
```

## Start frontend

```bash
npm run dev
```

## Build frontend

```bash
npm run build
```

## Create Python environment

```bash
cd backend
python -m venv venv
```

## Activate Python environment — Windows

```bash
venv\Scripts\activate
```

## Install backend dependencies

```bash
pip install -r requirements.txt
```

## Start backend

```bash
uvicorn main:app --reload
```

---

# 🛠️ Development Workflow

```text
Start Backend
     ↓
Start React Frontend
     ↓
Test FastAPI
     ↓
Enter Resume Information
     ↓
Improve Summary
     ↓
Improve Projects
     ↓
Improve Experience
     ↓
Generate Complete Resume
     ↓
Check Live Preview
     ↓
Check Links
     ↓
Download PDF
```

---

# 🚀 Future Improvements

Possible future features include:

* 📊 AI Resume Score
* 🎯 Job Description / Resume Matching
* 🔍 ATS Compatibility Checker
* 📝 AI Cover Letter Generator
* 💼 Portfolio Website Generator
* 📈 Skill Gap Analysis
* 🎨 Additional Resume Templates
* 📄 Resume Upload and AI Analysis
* 🔗 LinkedIn Profile Analysis
* 📱 Mobile Responsive UI
* 🔐 User Authentication
* 💾 Save Multiple Resumes
* 📚 Multiple Resume Versions
* 🌐 Production Deployment

---

# 👨‍💻 Author

**Anaghbrati Sinha Ray**

B.Tech Computer Science Engineering

---

# ⭐ Project Goal

The goal of this project is to combine a traditional resume builder with generative AI.

Users provide their **real information**, while Gemini AI helps transform that information into clear, professional and ATS-friendly resume content.

The AI is instructed to:

* Keep information truthful
* Avoid inventing technologies
* Avoid inventing experience
* Avoid inventing achievements
* Avoid inventing numbers
* Use strong action verbs
* Improve professional language
* Improve ATS compatibility

---

## 📌 Quick Start

If the project is already cloned, the quickest setup is:

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

Open another terminal in the project root:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

Your AI Resume Builder is now running locally.
