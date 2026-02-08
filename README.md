# 🚀 HRMS Lite – Full Stack Application

![Python](https://img.shields.io/badge/Python-3.9%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

> A lightweight Human Resource Management System (HRMS) built as a full-stack web application. This system allows an admin to manage employees and track daily attendance through a clean, professional interface.

---

## 🔗 Live Demo

- **Frontend (Vercel):** https://hrms-admin-system.vercel.app  
- **Backend (Render):** Hosted on Render (Free Tier)

---

## ✨ Features

### 👤 Employee Management
* **Onboarding:** Add new employees with a unique Employee ID.
* **Directory:** View all employees in a structured, sortable table.
* **Controls:** Easily delete or update employee records.
* **Validation:** Built-in email validation and duplicate prevention.

### 📅 Attendance Management
* **Daily Tracking:** Mark daily attendance (Present / Absent) effortlessly.
* **History:** Date-wise attendance tracking and history logs.
* **Visuals:** Monthly calendar view per employee.

### 📊 Dashboard & Reports
* **Real-time Insights:** View total employee counts and daily attendance summaries.
* **Analytics:** Attendance percentage calculations.
* **Reporting:** Employee-wise attendance reports and monthly breakdowns.

---

## 🛠 Tech Stack

### 🎨 Frontend
* **Framework:** React (Vite)
* **UI Library:** Material UI (MUI)
* **HTTP Client:** Axios
* **Visualization:** Chart.js

### ⚙ Backend
* **Framework:** FastAPI
* **ORM:** SQLAlchemy
* **Database:** SQLite

---

## 📂 Project Structure

```bash
hrms-admin-system
├── backend/            # FastAPI Application
├── frontend/           # React Application
└── README.md           # Documentation


# ⚙️ Getting Started

Follow these steps to set up the project locally.

## 🔹 Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Start the server:**
   ```bash
   uvicorn app.main:app --reload
   ```
**The backend will run at:** [http://localhost:8000](http://localhost:8000)

## 🔹 Frontend Setup
Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
**The frontend will run at:** [http://localhost:5173](http://localhost:5173)

## 👤 Author
Yuvraj Singh Aswal
