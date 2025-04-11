import { useState } from "react";
import React from "react";
import "../styles/authForm.css";

const AuthForm = ({ type, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={(e) => onSubmit(e, { firstName, lastName, email, password })}
      >
        <h2>{type === "signup" ? "Sign Up" : "Log In"}</h2>

        {type === "signup" && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {type === "signup" ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
