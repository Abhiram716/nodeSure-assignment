import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/LoginPage.css";
import apiClient from "../services/apiService";
import LoginFailedAlert from "../components/LoginFailedAlert";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("default");

  const navigate = useNavigate();
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setLoginStatus("Pending");
        const response = await apiClient.post("/api/access-tokens", {
          username,
          password,
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        setLoginStatus("Success");
        navigate("/products");
      } catch (error) {
        setLoginStatus("Failure");
        setTimeout(() => {
          setLoginStatus("default");
        }, 1000);
      }
    },
    [username, password]
  );

  return (
    <div className="login-form">
      {loginStatus === "Failure" && <LoginFailedAlert />}
      <h1>LoginPage</h1>
      <form className="form-container" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loginStatus === "Pending"}>
          {loginStatus === "pending" ? "Loging in...." : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
