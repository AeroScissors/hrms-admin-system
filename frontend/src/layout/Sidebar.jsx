import { NavLink } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";

const menuItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Employees", path: "/employees", icon: <PeopleIcon /> },
  { label: "Attendance", path: "/attendance", icon: <EventAvailableIcon /> },
  { label: "Reports", path: "/reports", icon: <BarChartIcon /> },
  { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        boxShadow: "2px 0 6px rgba(0,0,0,0.03)",
      }}
    >
      {/* Logo / Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          px: 3,
          py: 2.5,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <DescriptionIcon color="primary" />
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="text.primary"
        >
          HRMS Admin System
        </Typography>
      </Box>

      {/* Menu */}
      <List sx={{ px: 1.5, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.8 }}>
            <NavLink
              to={item.path}
              end={item.path === "/"}
              style={{ textDecoration: "none", width: "100%" }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1.2,
                    backgroundColor: isActive ? "#eaf2ff" : "transparent",
                    color: isActive ? "#2563eb" : "#374151",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? "#2563eb" : "#6b7280",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
