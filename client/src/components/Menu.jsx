import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function MenuSimple(props) {
  const { firstMenuItemOnClick } = props;

  // USE STATE
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // HANDLER FUNCTIONS
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userInitials");
    navigate("/");
  };

  const username = localStorage.getItem("userInitials")
    ? localStorage.getItem("userInitials").toUpperCase()
    : "";

  // RETURN
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "#5d89c7" }}>
              {username}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ marginRight: 1, bgcolor: "#5d89c7" }} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          firstMenuItemOnClick();
          handleClose();
          }
        }>
          <ListItemIcon>
            <RestaurantIcon fontSize="small" />
          </ListItemIcon>
          My Food Diaries
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
