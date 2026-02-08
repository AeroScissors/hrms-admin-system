# backend/app/models/employee.py

from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True, nullable=False, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    department = Column(String, nullable=False)
