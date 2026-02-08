import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

/**
 * AttendanceTrendChart
 *
 * Line chart for dashboard
 * - Shows attendance rate over last 30 days
 * - Expects backend-driven data
 *
 * Data shape:
 * [
 *   {
 *     date: "2026-02-01",
 *     attendance_rate: 90,
 *     present: 9,
 *     total: 10
 *   }
 * ]
 */
export default function AttendanceTrendChart({
  data = [],
  title = "Attendance Trend",
}) {
  return (
    <Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        {/* HEADER */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last 30 days
          </Typography>
        </Box>

        {/* CHART */}
        <Box sx={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eee"
              />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value) => [`${value}%`, "Attendance"]}
                labelFormatter={(label) => `Date: ${label}`}
              />

              <Line
                type="monotone"
                dataKey="attendance_rate"
                stroke="#1976d2"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
