from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.core.database import Base, engine, SessionLocal
from app.core.seed_data import run_seed

# ----------------------------
# Routers
# ----------------------------
from app.routes import employees, attendance, reports, dashboard

# ----------------------------
# FastAPI App
# ----------------------------
app = FastAPI(
    title="HRMS Backend",
    description="HRMS Backend with Employees, Attendance, Reports, and Dashboard",
    version="1.2.0"
)

# ----------------------------
# CORS Middleware (FIXED)
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://hrms-admin-system.vercel.app",  # 👈 FRONTEND LIVE URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Create DB Tables
# ----------------------------
Base.metadata.create_all(bind=engine)

# ----------------------------
# Seed Data on Startup (DEV only)
# ----------------------------
@app.on_event("startup")
def seed_database():
    db: Session = SessionLocal()
    try:
        run_seed(db)
    finally:
        db.close()

# ----------------------------
# Include Routers
# ----------------------------
app.include_router(employees.router)
app.include_router(attendance.router)
app.include_router(reports.router)
app.include_router(dashboard.router)

# ----------------------------
# Root → Redirect to Swagger
# ----------------------------
@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")
