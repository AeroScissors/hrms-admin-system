# backend/app/schemas/employee.py

from pydantic import BaseModel, EmailStr


class CreateEmployee(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

    class Config:
        from_attributes = True
