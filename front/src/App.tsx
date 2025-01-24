import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Todo from "./components/todo";
import OnProcess from "./components/onProcess";
import Done from "./components/done";
import Sidebar from "./components/sidebar";
import { AlertProvider } from "./components/alertProvider";
import LoginSignup from "./pages/loginSignup";
import { UserProvider } from "./context/userContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/authProvider";

const router = createBrowserRouter([
  { path: "/login", element: <LoginSignup /> },
  {
    path: "*",
    element: (
      <div className="App">
        <AuthProvider>
          <header>
            <Navbar />
          </header>
          <main>
            <Sidebar />
            <Todo />
            <OnProcess />
            <Done />
          </main>
        </AuthProvider>
      </div>
    ),
  },
]);

function App() {
  return (
    <AlertProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AlertProvider>
  );
}

export default App;
