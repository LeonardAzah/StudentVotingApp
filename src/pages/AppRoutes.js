import React from "react";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../hooks/RequireAuth";
import Election from "./Election";
import Result from "./Result";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />

      <Route
        path="/home"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/home/poll"
        element={
          <RequireAuth>
            <Election />
          </RequireAuth>
        }
      />
      <Route
        path="/home/results"
        element={
          <RequireAuth>
            <Result />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
