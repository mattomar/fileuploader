import React from "react";
import "../styles/header.css"; // Import your styles
import cloudIcon from "../assets/cloud.png"; // Import image correctly

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
        <button className="btn sign-in">Sign In</button>
        <button className="btn sign-up">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
