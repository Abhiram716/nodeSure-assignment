import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/LoginPage.css";
import { useAuth } from "../contexts/AuthContextProvider";
import LoginFailedAlert from "../components/LoginFailedAlert";

function LoginPage() {
  const { signin, asyncStatus } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signin(username, password);
      navigate("/products");
    } catch (e) {}
  };

  return (
    <div className="login-form">
      {asyncStatus === "failure" && <LoginFailedAlert />}
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
        <button type="submit" disabled={asyncStatus === "Pending"}>
          {asyncStatus === "pending" ? "Loging in...." : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
