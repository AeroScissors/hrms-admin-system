import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

// Layout
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          
          {/* Topbar */}
          <Topbar />

          {/* Page Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: 3,
              overflowY: "auto",
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>

        </Box>
      </Box>
    </Router>
  );
}

export default App;
