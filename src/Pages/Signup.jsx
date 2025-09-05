// src/pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaFacebookF, FaTwitter, FaDribbble } from "react-icons/fa";
import "./Login.css"; // ✅ même CSS que Login

const API = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/user/signup`, {
        username,
        email,
        password,
      });
      const token = response.data.token;
      document.cookie = `token=${token}; path=/`;
      navigate("/");
    } catch (err) {
      setError("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <form className="login-form" onSubmit={handleSignup}>
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

          <button className="login-btn" type="submit">
            S'inscrire
          </button>

          {error && <p className="error-msg">{error}</p>}

          <p className="forgot">Vous avez déjà un compte ? Connectez-vous !</p>

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

export default Signup;
