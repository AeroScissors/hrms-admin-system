# backend/app/routes/employees.py

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.core.database import get_db
from app.models.employee import Employee
from app.schemas.employee import CreateEmployee, EmployeeResponse

router = APIRouter(prefix="/employees", tags=["Employees"])


# ----------------------------
# Add Employee
# ----------------------------
@router.post(
    "",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED
)
def add_employee(
    employee: CreateEmployee,
    db: Session = Depends(get_db)
):
    existing = db.query(Employee).filter(
        Employee.employee_id == employee.employee_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee with this employee_id already exists"
        )

    new_employee = Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


# ----------------------------
# List Employees
# ----------------------------
@router.get(
    "",
    response_model=list[EmployeeResponse]
)
def list_employees(
    search: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    """
    Returns a plain list of employees.
    - No pagination wrapper
    - No metadata
    - Frontend-safe for dropdowns
    """

    query = db.query(Employee)

    if search:
        query = query.filter(
            or_(
                Employee.employee_id.ilike(f"%{search}%"),
                Employee.full_name.ilike(f"%{search}%"),
                Employee.email.ilike(f"%{search}%"),
                Employee.department.ilike(f"%{search}%"),
            )
        )

    employees = query.order_by(Employee.employee_id.asc()).all()

    return employees


# ----------------------------
# Delete Employee
# ----------------------------
@router.delete(
    "/{employee_id}",
    status_code=status.HTTP_200_OK
)
def delete_employee(
    employee_id: str,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    db.delete(employee)
    db.commit()

    return {"message": "Employee deleted successfully"}
