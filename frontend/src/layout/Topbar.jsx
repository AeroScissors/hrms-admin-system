import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 3,
        }}
      >
        {/* Left: Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#111827",
            whiteSpace: "nowrap",
          }}
        >
          HRMS Admin System
        </Typography>

        {/* Center: Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
            px: 2,
            py: 0.6,
            borderRadius: 2,
            width: 360,
            maxWidth: "100%",
          }}
        >
          <SearchIcon sx={{ color: "#6b7280", fontSize: 20 }} />
          <InputBase
            placeholder="Search"
            sx={{
              ml: 1,
              flex: 1,
              fontSize: 14,
            }}
            disabled
          />
        </Box>

        {/* Right: Icons + Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton disabled>
            <AppsIcon sx={{ color: "#6b7280" }} />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={handleMenuOpen}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#2563eb",
                fontSize: 14,
              }}
            >
              A
            </Avatar>
            <KeyboardArrowDownIcon sx={{ color: "#6b7280" }} />
          </Box>

          {/* Dropdown (UI only) */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem disabled>Profile</MenuItem>
            <MenuItem disabled>Settings</MenuItem>
            <MenuItem disabled>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
