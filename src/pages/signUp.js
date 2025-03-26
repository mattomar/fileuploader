import AuthForm from "../components/authForm";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 🔹 React Router navigation

  const handleSignup = async (e, { firstName, lastName, email, password, adminKey }) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch("https://club-members-server-production.up.railway.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, adminKey }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.message || "Signup failed.");
        return;
      }
  
      console.log("Signup successful:", data);

      // 🔹 Redirect user after successful signup
      navigate("/login"); 
    } catch (error) {
      setError("Error connecting to the server.");
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