import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiHeartFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [tabActive, setTabActive] = useState(null);
  const tabs = ["Characters", "Comics"];
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.slice(1).toLowerCase();
    const matchedTab = tabs.find(tab => tab.toLowerCase() === currentPath);
    setTabActive(matchedTab || null);
  }, [location, tabs]);

  return (
    <header className="header">
      {/* Glow Effects */}
      <div className="header-glow">
        <div className="glow-left" />
        <div className="glow-right" />
        <div className="shimmer" />
      </div>

      <div className="header-content">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="logo-wrapper"
        >
          <Link to="/" className="logo-text">
            Marvel
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="nav-links">
          {tabs.map((item) => (
            <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`/${item.toLowerCase()}`}
                className={`nav-link ${tabActive === item ? "active" : ""}`}
                onClick={() => setTabActive(item)}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Favorites Button */}
        <div className="favorites-button">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/favorites" className="btn-favorites">
              <RiHeartFill className="heart-icon" />
              <span className="favorites-text">Favoris</span>
              <div className="shine" />
            </Link>
          </motion.div>
        </div>

        {/* Auth Buttons */}
        <div className="auth-links">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/login" className="auth-btn">Se connecter</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/signup" className="auth-btn">S'inscrire</Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

export default Header;
