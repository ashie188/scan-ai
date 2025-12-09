import React from "react";
import ReactDoM from "react-dom";

export default function Footer(){
  return(
    <footer className="footer">
      <div className="footer-content">

        {/* Project Name */}
        <div className="footer-brand">
          <span className="brand-main">Scan</span>
          <span className="brand-accent">AI</span>
        </div>

        {/* Navigation */}
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
        </div>

        {/* Social Icons */}
        <div className="footer-socials">

          {/* GitHub */}
          <a href="#" className="social-icon" aria-label="GitHub">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.48 0 12.25c0 5.41 3.44 9.97 8.2 11.59.6.11.82-.27.82-.6v-2.12c-3.34.76-4.04-1.66-4.04-1.66-.55-1.42-1.33-1.8-1.33-1.8-1.1-.77.08-.75.08-.75 1.22.09 1.85 1.28 1.85 1.28 1.08 1.88 2.82 1.33 3.5 1.02.11-.8.43-1.33.78-1.63-2.66-.31-5.47-1.37-5.47-6.1 0-1.35.47-2.46 1.24-3.32-.12-.31-.54-1.56.12-3.27 0 0 1.01-.33 3.3 1.3a11.4 11.4 0 0 1 3-.41c1.02 0 2.04.14 3 .41 2.28-1.63 3.29-1.3 3.29-1.3.67 1.71.24 2.96.12 3.27.77.86 1.23 1.97 1.23 3.32 0 4.75-2.82 5.78-5.5 6.07.44.39.82 1.15.82 2.32v3.43c0 .33.22.72.83.6C20.57 22.23 24 17.66 24 12.25 24 5.48 18.63 0 12 0z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="#" className="social-icon" aria-label="LinkedIn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14C2.2 0 0 2.24 0 5v14c0 2.76 2.2 5 5 5h14c2.77 0 5-2.24 5-5V5c0-2.76-2.23-5-5-5zM7.16 20H4.34V9h2.82v11zM5.75 7.67c-.9 0-1.63-.75-1.63-1.67S4.84 4.33 5.75 4.33c.89 0 1.62.75 1.62 1.67 0 .92-.72 1.67-1.62 1.67zM20 20h-2.8v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-1.99 1.35-1.99 2.74V20h-2.79V9h2.67v1.5h.04c.37-.7 1.28-1.46 2.63-1.46 2.81 0 3.35 1.92 3.35 4.42V20z"/>
            </svg>
          </a>

          {/* Twitter */}
          <a href="#" className="social-icon" aria-label="Twitter">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.6a9.77 9.77 0 0 1-2.83.8 4.93 4.93 0 0 0 2.16-2.73 9.86 9.86 0 0 1-3.12 1.24A4.92 4.92 0 0 0 16.6 3c-2.73 0-4.94 2.3-4.94 5.13 0 .4.03.8.1 1.18C7.7 9.1 4.1 6.9 1.67 3.6c-.44.8-.7 1.75-.7 2.75 0 1.9.9 3.58 2.3 4.57a4.85 4.85 0 0 1-2.24-.66v.06c0 2.67 1.82 4.9 4.23 5.42-.45.13-.93.2-1.42.2-.35 0-.68-.04-.99-.1.67 2.17 2.66 3.75 5 3.8A9.9 9.9 0 0 1 0 19.54a13.9 13.9 0 0 0 7.55 2.28c9.06 0 14.01-7.83 14.01-14.63v-.7A10.7 10.7 0 0 0 24 4.6z"/>
            </svg>
          </a>

        </div>

        {/* Credits */}
        <div className="footer-copy">
          © {new Date().getFullYear()} Scan-AI • Made by <span className="highlight">Ashutosh</span>
        </div>

      </div>
    </footer>
  );
}
