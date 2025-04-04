import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import axios
import AuthForm from "../components/authForm";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 🔹 React Router navigation
  const handleSignup = async (e, { firstName, lastName, email, password }) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch("http://localhost:5005/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Signup failed.");
      }
  
      console.log("Signup successful:", data);
      navigate("/login"); // 🔹 Redirect after signup
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  

  return (
    <div>
      <AuthForm type="signup" onSubmit={handleSignup} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;