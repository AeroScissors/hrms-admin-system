import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import {
  getEmployees,
  getEmployeeAttendanceReport,
  getMonthlyAttendanceReport,
  getAttendanceByDepartment,
} from "../api/api";

import StatCard from "../components/StatCard";
import DepartmentAttendanceChart from "../components/DepartmentAttendanceChart";
import Loader from "../components/Loader";

/* =========================
   Utility: last 30 days
========================= */
const getDateRange = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);

  return {
    start_date: start.toISOString().split("T")[0],
    end_date: end.toISOString().split("T")[0],
  };
};

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  /* =========================
     LOAD EMPLOYEES + DEPARTMENTS
  ========================= */
  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      setError(null);

      const [empRes, deptRes] = await Promise.all([
        getEmployees(),
        getAttendanceByDepartment(),
      ]);

      if (empRes.error) {
        setError(empRes.error);
        setEmployees([]);
      } else {
        setEmployees(empRes.data || []);
      }

      if (deptRes.error) {
        setDepartmentData([]);
      } else {
        setDepartmentData(deptRes.data || []);
      }

      setLoading(false);
    }

    loadInitialData();
  }, []);

  /* =========================
     LOAD EMPLOYEE REPORTS
  ========================= */
  const loadReports = async (employeeId) => {
    if (!employeeId) return;

    setLoading(true);
    setError(null);

    const { start_date, end_date } = getDateRange();

    const [summaryRes, monthlyRes] = await Promise.all([
      getEmployeeAttendanceReport(employeeId, start_date, end_date),
      getMonthlyAttendanceReport(employeeId, start_date, end_date),
    ]);

    if (summaryRes.error) {
      setError(summaryRes.error);
      setSummary(null);
    } else {
      setSummary(summaryRes.data);
    }

    if (monthlyRes.error) {
      setMonthly([]);
    } else {
      setMonthly(monthlyRes.data || []);
    }

    setLoading(false);
  };

  if (loading && employees.length === 0) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Reports
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* EMPLOYEE SELECT */}
      <Box sx={{ mb: 3, maxWidth: 320 }}>
        <Select
          fullWidth
          displayEmpty
          value={selectedEmployeeId}
          onChange={(e) => {
            setSelectedEmployeeId(e.target.value);
            loadReports(e.target.value);
          }}
        >
          <MenuItem value="" disabled>
            Select Employee
          </MenuItem>

          {employees.map((emp) => (
            <MenuItem
              key={emp.employee_id}
              value={emp.employee_id}
            >
              {emp.full_name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* EMPLOYEE SUMMARY */}
      {selectedEmployeeId && summary && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Days" value={summary.total_days} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Present Days" value={summary.present_days} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Absent Days" value={summary.absent_days} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Attendance %"
              value={`${summary.present_percentage}%`}
            />
          </Grid>
        </Grid>
      )}

      {/* MONTHLY BREAKDOWN */}
      {monthly.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography fontWeight={600} gutterBottom>
              Monthly Breakdown
            </Typography>

            {monthly.map((row, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom: "1px solid #eee",
                }}
              >
                <Typography>{row.month}</Typography>
                <Typography>
                  {row.present_days} / {row.total_days}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* DEPARTMENT ATTENDANCE */}
      {departmentData.length > 0 && (
        <DepartmentAttendanceChart data={departmentData} />
      )}
    </Box>
  );
}
