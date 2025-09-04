import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiHeartFill, RiMenu4Fill, RiCloseFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"; // ✅ Fichier CSS séparé

function Header() {
  const [tabActive, setTabActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tabs = ["Characters", "Comics"];
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.slice(1).toLowerCase();
    const matchedTab = tabs.find(tab => tab.toLowerCase() === currentPath);
    setTabActive(matchedTab || null);
  }, [location, tabs]);

  const menuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <header className="header">
        {/* Glow Effects */}
        <div className="header-glow">
          <div className="glow-left" />
          <div className="glow-right" />
          <div className="shimmer" />
        </div>

        <div className="header-content">
          {/* Logo / Title */}
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

          {/* Navigation Links */}
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
                <span className="favorites-text">Favorites</span>
                <div className="shine" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <RiCloseFill size={24} /> : <RiMenu4Fill size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="mobile-menu"
          >
            <div className="mobile-menu-content">
              {[...tabs, "Favorites"].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className={`mobile-link ${tabActive === item ? "active" : ""}`}
                    onClick={() => {
                      setTabActive(item);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
