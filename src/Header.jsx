import React from "react";
import { Link } from "react-router-dom";

export default function Header({ user }) {
  return (
    <header className="header">
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo">
          <span className="logo-main">Scan</span>
          <span className="logo-accent">-AI</span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {user ? (
            <span className="user-greeting">
              Hi, <strong>{user.name}</strong>
            </span>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </nav>

      </div>
    </header>
  );
}
