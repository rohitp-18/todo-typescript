import React from "react";
import "./App.css";
import { AlertProvider } from "./components/alertProvider";
import LoginSignup from "./pages/loginSignup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/authProvider";
import Home from "./pages/home";

const router = createBrowserRouter([
  { path: "/login", element: <LoginSignup /> },
  {
    path: "*",
    element: (
      <AuthProvider>
        <Home />
      </AuthProvider>
    ),
  },
]);

function App() {
  return (
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  );
}

export default App;
