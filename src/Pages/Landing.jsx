import { Link } from "react-router-dom";
import spiderman from "../assets/landing-page.png"; 

import "./Landing.css";

const Landing = () => {
  return (
    <section className="landing-container">
      <div className="landing-overlay">
        <h1 className="landing-title">MARVEL</h1>
        <img
          className="spiderman-img"
          src={spiderman}
          alt="Spider-Man"
        />
        <Link to="/characters" className="enter-btn">
          Enter Universe
        </Link>
      </div>
    </section>
  );
};

export default Landing;

