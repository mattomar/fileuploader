import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import cloudIcon from "../assets/cloud.png";
import LogoutButton from "./logOutButton";
import { getToken } from "../utils/api";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  useEffect(() => {
    const handleStorageChange = () => setIsLoggedIn(!!getToken());
    window.addEventListener("storage", handleStorageChange);

    // In case logout is triggered in the same tab
    const interval = setInterval(() => {
      setIsLoggedIn(!!getToken());
    }, 500); // optional, makes sure it updates instantly

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={cloudIcon} alt="Cloud" className="cloud-icon" />
        <h1>
          <span className="bold">SHDW</span> Drive
        </h1>
      </Link>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <Link to="/folders" className="btn my-folders">My Folders</Link>
            <LogoutButton onLogout={() => setIsLoggedIn(false)} />
          </>
        ) : (
          <>
            <Link to="/login" className="btn sign-in">Sign In</Link>
            <Link to="/signup" className="btn sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;