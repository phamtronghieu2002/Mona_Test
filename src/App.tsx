import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/route";
import React from "react";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route?.layout || React.Fragment;
          const Component = route?.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute roles={route.roles || []}>
                  {Component ? (
                      <Component />
                  ) : null}
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
