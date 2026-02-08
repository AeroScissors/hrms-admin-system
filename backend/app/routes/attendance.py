# backend/app/routes/attendance.py

from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.core.database import get_db
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.schemas.attendance import CreateAttendance, AttendanceResponse

router = APIRouter(prefix="/attendance", tags=["Attendance"])


# ----------------------------
# Mark Attendance
# ----------------------------
@router.post(
    "",
    response_model=AttendanceResponse,
    status_code=status.HTTP_201_CREATED
)
def mark_attendance(
    attendance: CreateAttendance,
    db: Session = Depends(get_db)
):
    # Block future dates
    if attendance.date > date.today():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Future dates are not allowed"
        )

    # Check if employee exists
    employee = db.query(Employee).filter(
        Employee.employee_id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee does not exist"
        )

    new_attendance = Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )

    db.add(new_attendance)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Attendance already marked for this employee on this date"
        )

    db.refresh(new_attendance)
    return new_attendance


# ----------------------------
# View Attendance per Employee
# ----------------------------
@router.get(
    "/{employee_id}",
    response_model=list[AttendanceResponse]
)
def get_attendance(
    employee_id: str,
    start_date: date | None = Query(default=None),
    end_date: date | None = Query(default=None),
    db: Session = Depends(get_db)
):
    # Check employee exists
    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    # Validate date range
    if start_date and end_date and start_date > end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="start_date cannot be greater than end_date"
        )

    query = db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    )

    if start_date:
        query = query.filter(Attendance.date >= start_date)

    if end_date:
        query = query.filter(Attendance.date <= end_date)

    records = query.order_by(Attendance.date.desc()).all()

    # Employee exists but no attendance → empty list
    return records
