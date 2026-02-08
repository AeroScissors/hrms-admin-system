import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  MenuItem,
  Select,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import {
  getEmployees,
  getAttendanceByEmployee,
  markAttendance,
} from "../api/api";

import Loader from "../components/Loader";
import AttendanceTable from "../components/AttendanceTable";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceCalendar from "../components/AttendanceCalendar";

export default function Attendance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [attendance, setAttendance] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [status, setStatus] = useState("Present");

  /* =========================
     LOAD EMPLOYEES
  ========================= */
  useEffect(() => {
    async function loadEmployees() {
      setLoading(true);
      const res = await getEmployees();

      if (res.error) {
        setError(res.error);
        setEmployees([]);
      } else {
        setEmployees(res.data || []);
      }

      setLoading(false);
    }

    loadEmployees();
  }, []);

  /* =========================
     LOAD ATTENDANCE
  ========================= */
  useEffect(() => {
    if (!selectedEmployeeId) return;

    async function loadAttendance() {
      setLoading(true);
      setError(null);

      const res = await getAttendanceByEmployee(selectedEmployeeId);

      if (res.error) {
        setError(res.error);
        setAttendance([]);
      } else {
        setAttendance(res.data || []);
      }

      setLoading(false);
    }

    loadAttendance();
  }, [selectedEmployeeId]);

  /* =========================
     ATTENDANCE MAP (FOR CALENDAR)
  ========================= */
  const attendanceMap = useMemo(() => {
    const map = {};
    attendance.forEach((r) => {
      map[r.date] = r.status;
    });
    return map;
  }, [attendance]);

  /* =========================
     CHECK ALREADY MARKED
  ========================= */
  const alreadyMarked = useMemo(() => {
    return attendance.some((r) => r.date === date);
  }, [attendance, date]);

  /* =========================
     MARK ATTENDANCE
  ========================= */
  const handleMarkAttendance = async () => {
    if (!selectedEmployeeId || alreadyMarked) return;

    setLoading(true);
    setError(null);

    const res = await markAttendance({
      employee_id: selectedEmployeeId,
      date,
      status,
    });

    if (res.error) {
      setError(res.error);
    } else {
      const refreshed = await getAttendanceByEmployee(selectedEmployeeId);
      setAttendance(refreshed.data || []);
      setDate(today);
    }

    setLoading(false);
  };

  /* =========================
     INITIAL LOADER
  ========================= */
  if (loading && employees.length === 0) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Attendance
      </Typography>

      {/* ERROR */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* EMPLOYEE SELECT */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Select
            fullWidth
            displayEmpty
            value={selectedEmployeeId}
            onChange={(e) => {
              setSelectedEmployeeId(e.target.value);
              setError(null);
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
        </Grid>
      </Grid>

      {/* MARK ATTENDANCE */}
      {selectedEmployeeId && (
        <AttendanceForm
          date={date}
          status={status}
          today={today}
          alreadyMarked={alreadyMarked}
          loading={loading}
          onDateChange={setDate}
          onStatusChange={setStatus}
          onSubmit={handleMarkAttendance}
        />
      )}

      {/* ATTENDANCE CALENDAR (POLISHED CARD) */}
      {selectedEmployeeId && attendance.length > 0 && (
        <Card sx={{ mt: 4, borderRadius: 3 }}>
          <CardContent>
            {/* Header */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Attendance Calendar
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly visual overview
              </Typography>
            </Box>

            {/* Legend */}
            <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#1976d2",
                  }}
                />
                <Typography variant="caption">Present</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#d32f2f",
                  }}
                />
                <Typography variant="caption">Absent</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#e0e0e0",
                  }}
                />
                <Typography variant="caption">Not marked</Typography>
              </Box>
            </Box>

            {/* Calendar */}
            <AttendanceCalendar attendanceMap={attendanceMap} />
          </CardContent>
        </Card>
      )}

      {/* EMPTY STATES */}
      {!selectedEmployeeId && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography color="text.secondary">
              Select an employee to view attendance history.
            </Typography>
          </CardContent>
        </Card>
      )}

      {selectedEmployeeId && attendance.length === 0 && !loading && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography color="text.secondary">
              No attendance found.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* HISTORY TABLE */}
      {attendance.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <AttendanceTable attendance={attendance} />
        </Box>
      )}
    </Box>
  );
}
