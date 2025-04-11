import React, { useState } from "react";
import axios from "axios";
import AuthForm from "../components/authForm";

const Login = () => {
  const [error, setError] = useState("");

  const handleLogin = async (e, { email, password }) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5018/api/auth/login", { email, password });

      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Error connecting to the server.");
      console.error(
      );
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