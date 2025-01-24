import React, { useContext, useEffect, useState } from "react";
import "./loginSignup.css"; // Import your CSS file
import { Button } from "@mui/material";
import { useUser } from "../context/userContext";
import { AlertContext } from "../components/alertProvider";
import axios from "../context/axios";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { user, loading, setUser, setLoading } = useUser();
  const { sendAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!isLoginMode) {
      if (!name || !email || !password) {
        sendAlert("Please fill in all fields", "error");
        setLoading(false);
        return;
      }
    } else {
      if (!email || !password) {
        sendAlert("Please fill in all fields", "error");
        setLoading(false);
        return;
      }
    }

    try {
      if (!isLoginMode) {
        const { data } = await axios.post("/users/register", {
          name,
          email,
          password,
        });

        sendAlert(data.message, "success");
        setUser(data.user);
      } else {
        const { data } = await axios.post("/users/login", { email, password });

        sendAlert(data.message, "success");
        setUser(data.user);
      }
    } catch (error: any) {
      sendAlert(
        error.response ? error.response.data.message : "Internal Error",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  function toggleButton() {
    setIsLoginMode(!isLoginMode);
    setName("");
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    if (user) {
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    }
  }, [user]);

  return (
    <div className="background">
      {!user && (
        <div className="container">
          {loading && (
            <div className="loading">
              <div className="spin"></div>
            </div>
          )}
          {!loading && (
            <div className="form-container">
              <form onSubmit={handleFormSubmit}>
                <h2>{isLoginMode ? "Login" : "Signup"}</h2>
                <div className="input-group">
                  {!isLoginMode && (
                    <>
                      <label htmlFor="name">Name:</label>
                      <input
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        type="text"
                        id="name"
                        required
                      />
                    </>
                  )}
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    autoComplete={
                      isLoginMode ? "current-password" : "new-password"
                    }
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    required
                  />
                </div>
                {/*  Add "Remember Me" checkbox */}
                {/* <div className="checkbox">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div> */}

                <Button
                  variant="contained"
                  sx={{ textTransform: "capitalize" }}
                  type="submit"
                >
                  {isLoginMode ? "Login" : "Sign Up"}
                </Button>
                <p>
                  {isLoginMode
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <span onClick={toggleButton}>
                    {isLoginMode ? " Signup" : " Login"}
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
