import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import styles from "./TopBar.module.css";

const TopBar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.TopBar}>
      <AppBar position="static">
        <Toolbar>
          <img
            style={{ width: "32px", borderRadius: "50%" }}
            src={process.env.PUBLIC_URL + "/parrot-3.png"}
            alt="logo"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WordBank
          </Typography>
          <IconButton
            size="large"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {props.loggedIn && (
              <MenuItem
                onClick={() => {
                  props.history.push("/auth/logout");
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            )}
            {!props.loggedIn && (
              <MenuItem
                onClick={() => {
                  props.history.push("/auth/login");
                }}
              >
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            )}
            {!props.loggedIn && (
              <MenuItem
                onClick={() => {
                  props.history.push("/auth/register");
                }}
              >
                <ListItemIcon>
                  <PersonAddIcon fontSize="small" />
                </ListItemIcon>
                Register
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default withRouter(TopBar);
