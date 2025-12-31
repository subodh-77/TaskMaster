import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css"; 

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      {/* HERO SECTION */}
      <section className="hero-section">
        <h1>Organize Your Work <br /> and Life.</h1>
        <p>
          The simple, secure, and fast task manager designed for high-performance 
          teams and individuals.
        </p>
        <div className="landing-buttons">
          <button className="btn-main btn-white" onClick={() => navigate("/login")}>
            Login Now
          </button>
          <button className="btn-main btn-outline" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-container">
        <div className="feature-card">
          <span>🛡️</span>
          <h3>Secure</h3>
          <p>JWT-based authentication ensures your data stays private and safe.</p>
        </div>
        <div className="feature-card">
          <span>⚡</span>
          <h3>Fast</h3>
          <p>Optimized for performance with real-time UI updates and smooth CRUD.</p>
        </div>
        <div className="feature-card">
          <span>📱</span>
          <h3>Responsive</h3>
          <p>Full control of your tasks on desktop, tablet, or mobile devices.</p>
        </div>
      </section>

      <footer style={{ textAlign: "center", paddingBottom: "40px", color: "#9ca3af" }}>
        <p>&copy; 2025 TaskMaster App. All rights reserved.
          Made by Subodh Pathak.
        </p>
      </footer>
    </div>
  );
}