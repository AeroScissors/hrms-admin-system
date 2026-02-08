from datetime import date, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case

from app.core.database import get_db
from app.models.employee import Employee
from app.models.attendance import Attendance

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


# -------------------------------------------------
# TODAY SNAPSHOT
# -------------------------------------------------
@router.get("/today")
def dashboard_today(db: Session = Depends(get_db)):
    today = date.today()

    total_employees = db.query(Employee).count()

    present_today = db.query(Attendance).filter(
        Attendance.date == today,
        Attendance.status == "Present"
    ).count()

    absent_today = db.query(Attendance).filter(
        Attendance.date == today,
        Attendance.status == "Absent"
    ).count()

    attendance_rate = (
        (present_today / total_employees) * 100
        if total_employees > 0 else 0
    )

    return {
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today,
        "attendance_rate": round(attendance_rate, 2),
    }


# -------------------------------------------------
# LAST 30 DAYS TREND (DASHBOARD ONLY)
# -------------------------------------------------
@router.get("/last-30-days")
def dashboard_last_30_days(db: Session = Depends(get_db)):
    today = date.today()
    start_date = today - timedelta(days=29)

    records = (
        db.query(
            Attendance.date.label("date"),
            func.count().label("total"),
            func.sum(
                case(
                    (Attendance.status == "Present", 1),
                    else_=0
                )
            ).label("present"),
        )
        .filter(
            Attendance.date >= start_date,
            Attendance.date <= today
        )
        .group_by(Attendance.date)
        .order_by(Attendance.date)
        .all()
    )

    data = []

    for r in records:
        attendance_rate = (
            (r.present / r.total) * 100
            if r.total > 0 else 0
        )

        data.append({
            "date": r.date.isoformat(),
            "attendance_rate": round(attendance_rate, 2),
            "present": r.present,
            "total": r.total,
        })

    return data
