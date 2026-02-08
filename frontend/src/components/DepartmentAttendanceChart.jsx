import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

/**
 * DepartmentAttendanceChart
 *
 * Bar chart: Present vs Absent by Department
 * - Intended for REPORTS (not dashboard)
 * - Display-only, backend-driven
 *
 * Expected data shape:
 * [
 *   {
 *     department: "HR",
 *     present: 8,
 *     absent: 2,
 *     total: 10
 *   }
 * ]
 */
export default function DepartmentAttendanceChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        {/* HEADER */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Present vs Absent by Department
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Attendance distribution
          </Typography>
        </Box>

        {/* EMPTY STATE */}
        {!hasData && (
          <Typography variant="body2" color="text.secondary">
            No department attendance data available.
          </Typography>
        )}

        {/* CHART */}
        {hasData && (
          <Box sx={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eee"
                />

                <XAxis
                  dataKey="department"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(value, name, props) => {
                    const total = props.payload.total;
                    return [
                      `${value} / ${total}`,
                      name === "present" ? "Present" : "Absent",
                    ];
                  }}
                />

                <Legend />

                <Bar
                  dataKey="present"
                  fill="#1976d2"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="absent"
                  fill="#ef5350"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
