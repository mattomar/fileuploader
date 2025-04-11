import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <button className="btn" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;