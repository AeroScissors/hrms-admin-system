import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

/**
 * StatCard
 *
 * Advanced KPI card
 * - Icon badge
 * - Value + subtitle
 * - Optional progress bar
 * - Optional trend text
 *
 * Props:
 * - title
 * - value
 * - subtitle
 * - icon (JSX)
 * - progress (0–100)
 * - trend (string, e.g. "+2.3% This Month")
 * - color ("primary" | "success" | "error")
 */
export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  progress,
  trend,
  color = "primary",
}) {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            {title}
          </Typography>

          {icon && (
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: `${color}.light`,
                color: `${color}.main`,
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {/* VALUE */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 0.5 }}
        >
          {value}
        </Typography>

        {/* SUBTITLE */}
        {subtitle && (
          <Typography
            variant="caption"
            sx={{ color: "text.secondary" }}
          >
            {subtitle}
          </Typography>
        )}

        {/* PROGRESS */}
        {typeof progress === "number" && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={color}
              sx={{
                height: 6,
                borderRadius: 5,
              }}
            />
          </Box>
        )}

        {/* TREND */}
        {trend && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 1,
              color: "success.main",
              fontWeight: 500,
            }}
          >
            {trend}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
