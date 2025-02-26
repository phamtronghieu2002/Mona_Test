import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/route";
import React from "react";
import { ToastContainer } from "react-toastify";

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
                Component ? (
                  <Layout>
                    <Component />
                  </Layout>
                ) : null
              }
            />
          );
        })}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
