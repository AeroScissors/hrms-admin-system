import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";

/**
 * AttendanceCalendar
 *
 * Props:
 * - attendanceMap: {
 *     "YYYY-MM-DD": "Present" | "Absent"
 *   }
 */
export default function AttendanceCalendar({ attendanceMap = {} }) {
  return (
    <DateCalendar
      disableFuture
      sx={{
        width: "100%",
        "& .MuiDayCalendar-weekDayLabel": {
          fontWeight: 600,
        },
      }}
      slots={{
        day: (props) => {
          const dateStr = dayjs(props.day).format("YYYY-MM-DD");
          const status = attendanceMap[dateStr];

          let bgColor = null;

          if (status === "Present") bgColor = "#1976d2"; // Blue
          if (status === "Absent") bgColor = "#d32f2f"; // Red

          return (
            <PickersDay
              {...props}
              sx={{
                backgroundColor: bgColor,
                color: bgColor ? "#fff" : "inherit",
                borderRadius: "50%",
                boxShadow: bgColor
                  ? "0 2px 6px rgba(0,0,0,0.25)"
                  : "none",
                fontWeight: bgColor ? 600 : 400,
                transition: "all 0.2s ease-in-out",

                "&:hover": {
                  backgroundColor: bgColor,
                  opacity: 0.85,
                },

                "&.Mui-selected": {
                  backgroundColor: bgColor,
                },
              }}
            />
          );
        },
      }}
    />
  );
}
