import { Box } from "@mui/material";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import RequireAuth from "./hooks/RequireAuth";
import Election from "./pages/Election";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Appbar from "./components/Appbar";
import Result from "./pages/Result";

import { useContext } from "react";
import AuthContext from "./hooks/AuthContext";
import AppRoutes from "./pages/AppRoutes";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div style={{ padding: "1rem" }}>
      <AppRoutes />
    </div>
  );
}

export default App;
