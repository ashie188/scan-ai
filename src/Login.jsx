// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please enter both name and email.");
      return;
    }

    try {
      setBusy(true);

      const res = await axios.post("http://localhost:5000/auth/login", {
        name: name.trim(),
        email: email.trim(),
      });

      if (!res.data.ok) {
        setError(res.data.error || "Login failed");
        return;
      }

      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.response?.data?.error || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page-root page-login">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to Scan-AI</h1>
          <p>Sign in to extract insights from your documents</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" disabled={busy}>
            {busy ? "Signing in..." : "Continue"}
          </button>
        </form>

        <div className="login-footer">
          <p>No password required • Secure server-side login</p>
        </div>
      </div>
    </div>
  );
}
