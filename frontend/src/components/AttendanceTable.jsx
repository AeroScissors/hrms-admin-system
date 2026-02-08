import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

/**
 * AttendanceTable
 *
 * Display-only component.
 * - No API calls
 * - No state ownership
 * - Latest attendance shown first
 */
export default function AttendanceTable({ attendance }) {
  if (!attendance || attendance.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography color="text.secondary">
          No attendance found
        </Typography>
      </Paper>
    );
  }

  // Defensive sort: latest date first
  const sortedAttendance = [...attendance].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedAttendance.map((record) => (
            <TableRow key={`${record.employee_id}-${record.date}`}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
