import React, { useContext } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Appbar from "../components/Appbar";
import { Box, Typography } from "@mui/material";
import AuthContext from "../hooks/AuthContext";
import Result from "./Result";
import Election from "./Election";

const Dashboard = () => {
  const { userInfo } = useContext(AuthContext);

  console.log(userInfo);
  return (
    <div>
      <Box sx={{ paddingBottom: "8rem" }}>
        <Appbar />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#01579B",
            fontWeight: "700",
            position: "absolute",
            textAlign: "center",
          }}
        >
          2023 CAMPUS ELECTION
        </Typography>
      </Box>
    </div>
  );
};

export default Dashboard;
