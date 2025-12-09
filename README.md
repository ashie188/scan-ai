# Scan-AI 🚀

Scan-AI is a full-stack web application that enables intelligent extraction and analysis of PDFs.
It is designed to handle **invoice PDFs** as well as **general PDFs**, powered by Google’s Gemini API.

The system provides structured invoice extraction, document summaries, Q&A, and custom instructions
through a clean React frontend and a secure Node.js backend.

---

## ✨ Features

### 📄 Invoice PDF

- Extracts structured invoice data:
  - Invoice number
  - Invoice & due dates
  - Seller & buyer details
  - Currency
  - Net, tax, and gross totals
  - Line items (description, quantity, price)
- AI-powered extraction using Gemini 2.5 Flash

### 📑 General PDF

- Summarize documents
- Extract headings & sections
- Ask questions (Q&A)
- Provide custom instructions for extraction

### 🔐 Authentication

- Simple login system (name + email)
- User stored in PostgreSQL
- User shown in UI header after login

### 🧠 AI & Security

- Gemini API key handled only in backend
- No secrets exposed to frontend
- Files processed securely via backend

---

## 🛠 Tech Stack

**Frontend**

- React (Vite)
- Axios
- CSS (custom styling)

**Backend**

- Node.js
- Express.js
- Multer (in-memory file uploads)
- Gemini 2.5 Flash API

**Database**

- PostgreSQL (for authentication)

---

## 📂 Project Structure

scan-ai/
├── frontend/
│ ├── src/
│ │ ├── Home.jsx
│ │ ├── ResultPanel.jsx
│ │ ├── Login.jsx
│ │ ├── Header.jsx
│ │ └── styles.css
│ ├── package.json
│ └── vite.config.js
│
├── backend/
│ ├── Server.js
│ ├── package.json
│ ├── .env.example
│
├── README.md
└── .gitignore

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ashie188/scan-ai.git
cd scan-ai

2️⃣ Backend Setup
cd backend
npm install


Create .env file:
GEMINI_API_KEY=your_gemini_api_key_here


Run backend:
node Server.js

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔁 API Routes
Invoice Extraction
POST /post/invoice
Content-Type: multipart/form-data
Body:
- file: PDF

🧪 Usage Flow
Login with name & email
Choose Invoice PDF or General PDF
Upload PDF
Select action (if General PDF)






```
