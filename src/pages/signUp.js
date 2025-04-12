import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/authForm";
import { signup } from "../utils/api";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e, formData) => {
    e.preventDefault();
    setError("");

    try {
      await signup(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
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