import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import {
  getEmployees,
  addEmployee,
  deleteEmployee,
} from "../api/api";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Loader from "../components/Loader";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  /* =========================
     LOAD EMPLOYEES
  ========================= */
  const loadEmployees = async () => {
    setLoading(true);
    setError(null);

    const res = await getEmployees();

    if (res.error) {
      setError(res.error);
      setEmployees([]);
    } else {
      // 🔒 Backend returns a plain list
      setEmployees(res.data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  /* =========================
     ADD EMPLOYEE
  ========================= */
  const handleAddEmployee = async (employeeData) => {
    const res = await addEmployee(employeeData);

    if (res.error) {
      return res.error;
    }

    setOpenModal(false);
    loadEmployees();
    return null;
  };

  /* =========================
     DELETE EMPLOYEE
  ========================= */
  const handleDeleteEmployee = async (employeeId) => {
    if (!window.confirm("Delete this employee?")) return;

    const res = await deleteEmployee(employeeId);

    if (res.error) {
      alert(res.error);
      return;
    }

    loadEmployees();
  };

  /* =========================
     INITIAL LOADER
  ========================= */
  if (loading && employees.length === 0) {
    return <Loader />;
  }

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Employees
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
        >
          Add Employee
        </Button>
      </Box>

      {/* ERROR */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* EMPTY STATE */}
      {!error && employees.length === 0 && !loading && (
        <Typography color="text.secondary">
          No employees found.
        </Typography>
      )}

      {/* TABLE */}
      {!error && employees.length > 0 && (
        <EmployeeTable
          employees={employees}
          onDelete={handleDeleteEmployee}
        />
      )}

      {/* ADD EMPLOYEE MODAL */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <EmployeeForm onAdd={handleAddEmployee} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
