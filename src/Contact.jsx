// src/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <div className="page-root page-contact">
      <div className="page-container contact-simple">
        <header className="contact-hero">
          <div>
            <h1 className="page-title">Contact</h1>
            <p className="lead">
              Need help integrating Scan-AI or have a question about invoice extraction?
              Send us a short email and we'll get back to you with next steps.
            </p>
            <p className="muted">
              Prefer a quick chat? Share a few bullet points in the email so we can reply faster.
            </p>
            <div className="contact-cta-row">
              <a className="btn contact-cta" href="mailto:hello@scan-ai.example?subject=Scan-AI%20inquiry">
                Email: hello@scan-ai.example
              </a>
              <a className="btn btn-outline" href="/about">About Scan-AI</a>
            </div>
          </div>

          <div className="contact-hero-card">
            <div className="small-label">Made by</div>
            <strong>Ashutosh</strong>
            <div className="muted">Founder • Scan-AI</div>

            <hr />

            <div className="info-row">
              <div className="info-title">Office</div>
              <div className="info-sub muted">Remote • India</div>
            </div>

            <div className="info-row">
              <div className="info-title">Response time</div>
              <div className="info-sub muted">Usually within 24–48 hours</div>
            </div>

            <div className="info-row social-compact">
              <div className="info-title">Social</div>
              <div className="social-links">
                <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </header>

        <section className="contact-faqs">
          <div className="faq">
            <h3>How to request a demo</h3>
            <p className="muted">
              Email us with the link to a sample PDF (or attach a redacted copy). Mention your desired
              fields and any validation rules you need — we'll reply with a short plan and ETA.
            </p>
          </div>

          <div className="faq">
            <h3>Security & privacy</h3>
            <p className="muted">
              Files are processed on your backend. We don't store or view your data. If you'd like, we can
              provide guidance on running Scan-AI behind your VPC or on-premises.
            </p>
          </div>

          <div className="faq">
            <h3>Integrations</h3>
            <p className="muted">
              We support webhook callbacks, REST API integration, and simple CSV export. Tell us your stack
              and we'll provide a sample integration snippet.
            </p>
          </div>
        </section>

        <footer className="contact-footer muted">
          <div>© {new Date().getFullYear()} Scan-AI • Built by Ashutosh</div>
        </footer>
      </div>
    </div>
  );
}
