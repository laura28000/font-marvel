import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src="/marvel-logo.png" alt="Marvel Logo" className="logo" />
        </Link>
      </div>

      <nav className="header-nav">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Personnages
        </Link>

        <Link
          to="/comics"
          className={location.pathname === "/comics" ? "active" : ""}
        >
          Comics
        </Link>

        <Link
          to="/favorites"
          className={location.pathname === "/favorites" ? "active" : ""}
        >
          Favoris
        </Link>
      </nav>
    </header>
  );
};

export default Header;
