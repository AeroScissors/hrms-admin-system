from datetime import date
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, case

from app.core.database import get_db
from app.models.employee import Employee
from app.models.attendance import Attendance

router = APIRouter(prefix="/reports", tags=["Reports"])


# -------------------------------------------------
# Employee-wise Attendance Summary
# -------------------------------------------------
@router.get("/attendance/employee/{employee_id}")
def employee_attendance_report(
    employee_id: str,
    start_date: date | None = Query(default=None),
    end_date: date | None = Query(default=None),
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    query = db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    )

    if start_date:
        query = query.filter(Attendance.date >= start_date)

    if end_date:
        query = query.filter(Attendance.date <= end_date)

    total_days = query.count()

    present_days = query.filter(
        Attendance.status == "Present"
    ).count()

    absent_days = total_days - present_days

    present_percentage = (
        (present_days / total_days) * 100
        if total_days > 0 else 0
    )

    return {
        "employee_id": employee_id,
        "total_days": total_days,
        "present_days": present_days,
        "absent_days": absent_days,
        "present_percentage": round(present_percentage, 2),
    }


# -------------------------------------------------
# Monthly Attendance Report (per employee)
# -------------------------------------------------
@router.get("/attendance/monthly/{employee_id}")
def monthly_attendance_report(
    employee_id: str,
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    records = (
        db.query(
            func.strftime("%Y-%m", Attendance.date).label("month"),
            func.count().label("total_days"),
            func.sum(
                case(
                    (Attendance.status == "Present", 1),
                    else_=0
                )
            ).label("present_days"),
        )
        .filter(
            Attendance.employee_id == employee_id,
            Attendance.date >= start_date,
            Attendance.date <= end_date,
        )
        .group_by("month")
        .order_by("month")
        .all()
    )

    report = []

    for row in records:
        present_percentage = (
            (row.present_days / row.total_days) * 100
            if row.total_days > 0 else 0
        )

        report.append({
            "month": row.month,
            "total_days": row.total_days,
            "present_days": row.present_days,
            "absent_days": row.total_days - row.present_days,
            "present_percentage": round(present_percentage, 2),
        })

    return report


# -------------------------------------------------
# Organization-level Attendance Summary
# -------------------------------------------------
@router.get("/attendance/summary")
def organization_attendance_summary(
    start_date: date | None = Query(default=None),
    end_date: date | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(Attendance)

    if start_date:
        query = query.filter(Attendance.date >= start_date)

    if end_date:
        query = query.filter(Attendance.date <= end_date)

    total_records = query.count()

    present_records = query.filter(
        Attendance.status == "Present"
    ).count()

    absent_records = total_records - present_records

    present_percentage = (
        (present_records / total_records) * 100
        if total_records > 0 else 0
    )

    return {
        "total_records": total_records,
        "present_records": present_records,
        "absent_records": absent_records,
        "present_percentage": round(present_percentage, 2),
    }
