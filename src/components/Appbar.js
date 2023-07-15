import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import BallotIcon from "@mui/icons-material/Ballot";

import Button from "@mui/material/Button";
import AuthContext from "../hooks/AuthContext";

const Appbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const userDetails = window.localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const username = user.name;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <Box>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "#fefefe" }} position="fixed">
        <Toolbar>
          <Button
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "#01579B",
              fontSize: "18px",
              width: "100%",
            }}
            href="/home"
          >
            School Voting
          </Button>

          <IconButton
            aria-label="home"
            href="/home"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <HomeIcon sx={{ color: "#009688" }} />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              sx={{
                color: "#000000",
                fontSize: "16px",
                display: { xs: "none", sm: "block" },
              }}
              href="/home/poll"
            >
              Elections
            </Button>
            <IconButton
              aria-label="elections"
              href="/home/poll"
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              <BallotIcon sx={{ color: "#009688" }} />
            </IconButton>

            <Button
              sx={{
                color: "#000000",
                fontSize: "16px",
                display: { xs: "none", sm: "block" },
              }}
              href="/home/results"
            >
              Results
            </Button>
            <IconButton
              aria-label="results"
              href="/home/results"
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              <HowToVoteIcon sx={{ color: "#009688" }} />
            </IconButton>

            <Button>
              {" "}
              <Avatar
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                {...stringAvatar(username)}
              />{" "}
            </Button>

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ marginTop: "3rem" }}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon />
                <Typography sx={{ padding: "0.3rem" }}> Logout </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
