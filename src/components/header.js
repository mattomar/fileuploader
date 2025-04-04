import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../styles/header.css"; 
import cloudIcon from "../assets/cloud.png"; 

const Header = () => {
  return (
    <header className="header">
      {/* Logo and Title */}
      <div className="logo">
        <img src={cloudIcon} alt="Cloud" className="cloud-icon" />
        <h1>
          <span className="bold">SHDW</span> Drive
        </h1>
      </div>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <Link to="/" className="btn sign-in">Sign In</Link>
        <Link to="/signup" className="btn sign-up">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;