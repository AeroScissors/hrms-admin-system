from datetime import date, timedelta
import random

from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.attendance import Attendance


# -------------------------------------------------
# CONFIG
# -------------------------------------------------
TOTAL_EMPLOYEES = 50

DEPARTMENTS = [
    "Engineering",
    "HR",
    "Finance",
    "Sales",
    "Marketing",
    "Operations",
    "Support",
    "IT",
]

EMPLOYEES_DATA = [
    ("Aarav Sharma", "aarav.sharma@company.com"),
    ("Vivaan Verma", "vivaan.verma@company.com"),
    ("Aditya Singh", "aditya.singh@company.com"),
    ("Rohan Mehta", "rohan.mehta@company.com"),
    ("Arjun Patel", "arjun.patel@company.com"),
    ("Kunal Gupta", "kunal.gupta@company.com"),
    ("Nikhil Malhotra", "nikhil.malhotra@company.com"),
    ("Siddharth Jain", "siddharth.jain@company.com"),
    ("Amit Khanna", "amit.khanna@company.com"),
    ("Rahul Iyer", "rahul.iyer@company.com"),

    ("Ananya Gupta", "ananya.gupta@company.com"),
    ("Priya Sharma", "priya.sharma@company.com"),
    ("Neha Verma", "neha.verma@company.com"),
    ("Kriti Kapoor", "kriti.kapoor@company.com"),
    ("Pooja Nair", "pooja.nair@company.com"),
    ("Sneha Rao", "sneha.rao@company.com"),
    ("Ritika Bansal", "ritika.bansal@company.com"),
    ("Ishita Chawla", "ishita.chawla@company.com"),
    ("Aditi Kulkarni", "aditi.kulkarni@company.com"),
    ("Simran Kaur", "simran.kaur@company.com"),

    ("Mohit Aggarwal", "mohit.aggarwal@company.com"),
    ("Deepak Yadav", "deepak.yadav@company.com"),
    ("Suresh Reddy", "suresh.reddy@company.com"),
    ("Manish Pandey", "manish.pandey@company.com"),
    ("Vikas Mishra", "vikas.mishra@company.com"),
    ("Sunil Chauhan", "sunil.chauhan@company.com"),
    ("Rajeev Saxena", "rajeev.saxena@company.com"),
    ("Pradeep Arora", "pradeep.arora@company.com"),
    ("Alok Srivastava", "alok.srivastava@company.com"),
    ("Ashish Tiwari", "ashish.tiwari@company.com"),

    ("Kavita Joshi", "kavita.joshi@company.com"),
    ("Meena Pillai", "meena.pillai@company.com"),
    ("Rashmi Deshpande", "rashmi.deshpande@company.com"),
    ("Nandita Ghosh", "nandita.ghosh@company.com"),
    ("Shalini Agarwal", "shalini.agarwal@company.com"),
    ("Divya Saxena", "divya.saxena@company.com"),
    ("Preeti Arvind", "preeti.arvind@company.com"),
    ("Anjali Bhat", "anjali.bhat@company.com"),
    ("Tanvi Kulkarni", "tanvi.kulkarni@company.com"),
    ("Riya Sengupta", "riya.sengupta@company.com"),
]


# -------------------------------------------------
# SEED EMPLOYEES
# -------------------------------------------------
def seed_employees(db: Session):
    """
    Seed exactly 50 realistic employees.
    Safe to re-run.
    """
    existing_count = db.query(Employee).count()
    if existing_count >= TOTAL_EMPLOYEES:
        return

    employees = []

    for i, (name, email) in enumerate(
        EMPLOYEES_DATA[existing_count:TOTAL_EMPLOYEES],
        start=existing_count + 1,
    ):
        emp_id = f"EMP{i:03d}"
        employees.append(
            Employee(
                employee_id=emp_id,
                full_name=name,
                email=email,
                department=random.choice(DEPARTMENTS),
            )
        )

    db.add_all(employees)
    db.commit()


# -------------------------------------------------
# SEED ATTENDANCE (LAST 30 DAYS)
# -------------------------------------------------
def seed_attendance(db: Session, days: int = 30):
    """
    Seed attendance for last N days (excluding today).
    """
    employees = db.query(Employee).all()
    if not employees:
        return

    today = date.today()

    for emp in employees:
        for i in range(1, days + 1):
            attendance_date = today - timedelta(days=i)

            exists = db.query(Attendance).filter(
                Attendance.employee_id == emp.employee_id,
                Attendance.date == attendance_date,
            ).first()

            if exists:
                continue

            status = "Present" if random.random() < 0.75 else "Absent"

            db.add(
                Attendance(
                    employee_id=emp.employee_id,
                    date=attendance_date,
                    status=status,
                )
            )

    db.commit()


# -------------------------------------------------
# SEED TODAY (PARTIAL ON PURPOSE)
# -------------------------------------------------
def seed_today_partial_attendance(db: Session):
    """
    Only some employees get attendance today.
    Intentional for dashboard & edge-case testing.
    """
    today = date.today()
    employees = db.query(Employee).all()

    db.query(Attendance).filter(
        Attendance.date == today
    ).delete()
    db.commit()

    sample_size = int(len(employees) * 0.6)
    today_employees = random.sample(employees, sample_size)

    for emp in today_employees:
        status = "Present" if random.random() < 0.8 else "Absent"

        db.add(
            Attendance(
                employee_id=emp.employee_id,
                date=today,
                status=status,
            )
        )

    db.commit()


# -------------------------------------------------
# MASTER SEED
# -------------------------------------------------
def run_seed(db: Session):
    seed_employees(db)
    seed_attendance(db, days=30)
    seed_today_partial_attendance(db)
