# backend/app/schemas/attendance.py

from datetime import date
from typing import Literal
from pydantic import BaseModel


class CreateAttendance(BaseModel):
    employee_id: str
    date: date
    status: Literal["Present", "Absent"]


class AttendanceResponse(BaseModel):
    id: int
    employee_id: str
    date: date
    status: str

    class Config:
        from_attributes = True
