export default function AttendanceSummaryChart({
  present,
  absent,
  total,
}) {
  const presentPercent = total ? (present / total) * 100 : 0;
  const absentPercent = total ? (absent / total) * 100 : 0;

  return (
    <div
      style={{
        padding: "16px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3>Attendance Distribution</h3>

      <div style={{ marginTop: "12px" }}>
        <div>Present ({present})</div>
        <div
          style={{
            height: "10px",
            background: "#4caf50",
            width: `${presentPercent}%`,
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginTop: "12px" }}>
        <div>Absent ({absent})</div>
        <div
          style={{
            height: "10px",
            background: "#f44336",
            width: `${absentPercent}%`,
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
}
