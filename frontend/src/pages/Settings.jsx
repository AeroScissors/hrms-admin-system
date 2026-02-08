import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";

export default function Settings() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* ADMIN INFO */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography fontWeight={600} gutterBottom>
                Admin Information
              </Typography>

              <TextField
                label="Admin Name"
                value="HR Administrator"
                fullWidth
                margin="normal"
                disabled
              />

              <TextField
                label="Email Address"
                value="admin@company.com"
                fullWidth
                margin="normal"
                disabled
              />
            </CardContent>
          </Card>
        </Grid>

        {/* ATTENDANCE SETTINGS */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography fontWeight={600} gutterBottom>
                Attendance Preferences
              </Typography>

              <FormControlLabel
                control={<Switch checked disabled />}
                label="Default status: Present"
              />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                These settings are view-only in the current version.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
