import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";

/**
 * EmployeeForm
 *
 * Pure input + submit component.
 * - No API calls
 * - No routing
 * - Returns form data to parent
 */
export default function EmployeeForm({ onAdd }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const err = await onAdd(form);

    if (err) {
      setError(err);
      setLoading(false);
      return;
    }

    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });

    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Employee ID"
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Full Name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Add Employee
        </Button>
      </Stack>
    </Box>
  );
}
