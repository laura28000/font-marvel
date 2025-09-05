// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css"; // On réutilise le même style

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inscription avec :", { username, email, password });
    // Tu peux ici envoyer les données à ton backend
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <img src="/images/marvel-logo.png" alt="Marvel Logo" className="logo" />

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log in</span>
        </p>

        <div className="social-divider">
          <hr />
          <span>Or</span>
          <hr />
        </div>

        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-dribbble"></i>
        </div>
      </div>
    </main>
  );
};

export default Signup;
