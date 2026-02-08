import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Alert,
} from "@mui/material";

import {
  getDashboardToday,
  getDashboardLast30Days,
} from "../api/api";

import StatCard from "../components/StatCard";
import AttendanceTrendChart from "../components/AttendanceTrendChart";
import Loader from "../components/Loader";

// Icons
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [todayData, setTodayData] = useState(null);
  const [trendData, setTrendData] = useState([]);

  /* =========================
     LOAD DASHBOARD DATA
  ========================= */
  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError(null);

      const [todayRes, trendRes] = await Promise.all([
        getDashboardToday(),
        getDashboardLast30Days(),
      ]);

      if (todayRes.error || trendRes.error) {
        setError(todayRes.error || trendRes.error);
      }

      if (!todayRes.error) {
        setTodayData(todayRes.data);
      }

      if (!trendRes.error) {
        setTrendData(trendRes.data || []);
      }

      setLoading(false);
    }

    loadDashboard();
  }, []);

  /* =========================
     LOADING STATE
  ========================= */
  if (loading && !todayData) {
    return <Loader />;
  }

  return (
    <Box sx={{ pb: 6, width: "100%" }}>
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Today’s attendance snapshot
        </Typography>
      </Box>

      {/* ERROR */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* KPI CARDS */}
      {todayData && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Employees"
              value={todayData.total_employees}
              icon={<PeopleIcon />}
              progress={100}
              color="primary"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Present Today"
              value={todayData.present_today}
              subtitle={`${todayData.attendance_rate}% attendance`}
              icon={<CheckCircleIcon />}
              progress={todayData.attendance_rate}
              color="success"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Absent Today"
              value={todayData.absent_today}
              subtitle={`${100 - todayData.attendance_rate}% absent`}
              icon={<CancelIcon />}
              progress={100 - todayData.attendance_rate}
              color="error"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Attendance Rate"
              value={`${todayData.attendance_rate}%`}
              subtitle="Today"
              icon={<BarChartIcon />}
              progress={todayData.attendance_rate}
              color="primary"
            />
          </Grid>
        </Grid>
      )}

      {/* 30-DAY TREND */}
      <Box sx={{ mt: 6 }}>
        {trendData.length > 0 ? (
          <AttendanceTrendChart
            title="Attendance Trend (Last 30 Days)"
            data={trendData}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No attendance data available for the last 30 days.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
