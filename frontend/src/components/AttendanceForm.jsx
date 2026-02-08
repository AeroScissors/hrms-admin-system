import {
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

/**
 * AttendanceForm
 *
 * Pure action component.
 * - NO employee selection
 * - NO API calls
 * - NO business logic
 *
 * Controlled entirely by Attendance.jsx
 */
export default function AttendanceForm({
  date,
  status,
  today,
  alreadyMarked,
  loading,
  onDateChange,
  onStatusChange,
  onSubmit,
}) {
  return (
    <Grid container spacing={2}>
      {/* DATE */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          type="date"
          fullWidth
          value={date}
          inputProps={{ max: today }}
          onChange={(e) => onDateChange(e.target.value)}
          disabled={loading}
        />
      </Grid>

      {/* STATUS */}
      <Grid item xs={12} sm={6} md={4}>
        <Select
          fullWidth
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          disabled={loading}
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
        </Select>
      </Grid>

      {/* ACTION */}
      <Grid item xs={12} sm={12} md={4}>
        <Button
          variant="contained"
          fullWidth
          disabled={alreadyMarked || loading}
          onClick={onSubmit}
        >
          {alreadyMarked ? "Already Marked" : "Mark Attendance"}
        </Button>
      </Grid>
    </Grid>
  );
}
