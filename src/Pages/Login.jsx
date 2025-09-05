// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaDribbble } from "react-icons/fa";
import "./Login.css";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/user/login`, {
        email,
        password,
      });
      const token = response.data.token;
      // Enregistre le token dans un cookie
      document.cookie = `token=${token}; path=/`;
      navigate("/");
    } catch (err) {
      setError("Identifiants invalides. Veuillez réessayer.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <img
          src="/assets/marvel-logo.png"
          alt="Marvel"
          className="marvel-logo"
        />
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
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

          <button className="login-btn" type="submit">
            Login
          </button>

          {error && <p className="error-msg">{error}</p>}

          <p className="forgot">Forgot Your Password?</p>

          <div className="social-login">
            <FaFacebookF className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaDribbble className="social-icon" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
