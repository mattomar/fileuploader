import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/authForm";
import { login } from "../utils/api";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e, formData) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("tokenExpiry", data.expiry || "");
      window.dispatchEvent(new Event("storage"));
      navigate("/folders");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        disabled={loading}
        error={error} // Passing error as prop
      />
      {loading && <p>Logging in...</p>}
    </div>
  );
};

export default Login;