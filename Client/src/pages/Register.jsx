import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import "../styles/auth.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");   
    setSuccess(""); 

    // --- NEW: Password Length Validation ---
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return; // Stop the function here
    }

    setIsLoading(true); 

    try {
      const response = await API.post("/auth/register", { 
        name: username, 
        email, 
        password 
      });
      
      setSuccess("Registration successful! Redirecting to login...");
      
      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Join TaskMaster to start organizing your life.</p>
        
        {error && <div className="message error-message">{error}</div>}
        {success && <div className="message success-message">{success}</div>}
        
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input 
              className="auth-input"
              type="text" 
              placeholder="Full Name" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              className="auth-input"
              type="email" 
              placeholder="name@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              className="auth-input"
              type="password" 
              placeholder="Min. 8 characters" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8" // HTML5 validation as a backup
              disabled={isLoading}
            />
          </div>

          <button 
            className="btn-auth" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
          <br /><br />
          <Link to="/" className="auth-link" style={{fontSize: '0.8rem'}}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}