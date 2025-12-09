// src/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="page-root page-about">
      <div className="page-container">
        <h1 className="page-title">About Scan-AI</h1>

        <p className="lead">
          Scan-AI is a lightweight, secure, and developer-first PDF processing tool that
          extracts structured invoice data and runs quality checks — built for teams that
          want reliable automation without losing control of their data.
        </p>

        <section className="about-cards">
          <div className="about-card">
            <h3>Why Scan-AI?</h3>
            <p>
              Automate data extraction from invoices and PDFs, reduce manual work, and speed up
              reconciliation. Designed to be integration-friendly and easy to extend.
            </p>
          </div>

          <div className="about-card">
            <h3>Built for privacy</h3>
            <p>
              Files are processed by your backend — you control API keys and storage. No secrets
              in the frontend.
            </p>
          </div>

          <div className="about-card">
            <h3>Flexible workflows</h3>
            <p>
              Use the invoice flow for structured data or the general flow for summaries, Q&A,
              and custom extraction tasks.
            </p>
          </div>
        </section>

        <section className="mission">
          <h2>Mission</h2>
          <p>
            Our goal is to make document automation approachable. Start with templates and
            rules, then iterate with AI assistance when necessary. Scan-AI prioritizes
            clarity, auditability and developer ergonomics.
          </p>
        </section>

        <section className="team">
          <h2>Made by</h2>
          <div className="team-row">
            <div className="team-card">
              <div className="avatar">AH</div>
              <div>
                <strong>Ashutosh</strong>
                <div className="muted">Founder • Developer</div>
              </div>
            </div>

            <div className="team-card">
              <div className="avatar">Scan</div>
              <div>
                <strong>Scan-AI</strong>
                <div className="muted">Invoice & PDF automation</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
