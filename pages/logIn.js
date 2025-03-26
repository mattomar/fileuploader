import AuthForm from "../components/authForm";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleLogin = async (e, { email, password }) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("https://club-members-server-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("Error connecting to the server.");
      console.error(error);
    }
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;