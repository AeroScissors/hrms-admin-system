# backend/app/models/attendance.py

from sqlalchemy import Column, Integer, String, Date, ForeignKey, UniqueConstraint
from app.core.database import Base


class Attendance(Base):
    __tablename__ = "attendance"

    # Internal DB identifier (never exposed to UI or APIs)
    id = Column(Integer, primary_key=True, index=True)

    # Business identifier (EMP001 style)
    employee_id = Column(
        String,
        ForeignKey("employees.employee_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    date = Column(Date, nullable=False)

    # Allowed values enforced at API level: "Present" | "Absent"
    status = Column(String, nullable=False)

    __table_args__ = (
        # Enforce ONE attendance record per employee per date
        UniqueConstraint(
            "employee_id",
            "date",
            name="unique_employee_date"
        ),
    )
