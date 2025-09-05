import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ margin: "-100px", once: false }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* ✅ Image principale Marvel */}
      <AnimatedSection>
        <img
          src="assets/landing-page.png" 
          alt="Marvel Logo"
          className="landing-logo"
        />
      </AnimatedSection>

      {/* ✅ Titre, description et bouton */}
      <AnimatedSection delay={0.2}>
        <h1 className="landing-title">Bienvenue dans l'univers Marvel</h1>
        <p className="landing-description">
          Explore les personnages, découvre les comics, et crée ta propre collection de favoris.
        </p>
        <button
          className="landing-button"
          onClick={() => navigate("/characters")}
        >
          Entrer dans l’univers
        </button>
      </AnimatedSection>

      {/* ✅ Image multiverse en bas */}
      <AnimatedSection delay={0.3}>
        <img
          src="assets/multiverse.jpeg" 
          alt="Univers Marvel"
          className="landing-bottom-image"
        />
      </AnimatedSection>
    </div>
  );
};

export default Landing;
