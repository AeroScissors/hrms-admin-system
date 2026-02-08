import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
