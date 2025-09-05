// src/components/Card.jsx
import { memo, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import "./Card.css";

const Card = ({
  image,
  title,
  description,
  isFavorite = false,
  onToggleFavorite,
  onClick,
}) => {
  const secureSrc = useMemo(() => {
    if (!image) return "";
    return image.startsWith("http://") ? image.replace("http://", "https://") : image;
  }, [image]);

  return (
    <article
      className="card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.(e)}
      aria-label={title}
    >
      <div className="card-media">
        {secureSrc && <img src={secureSrc} alt={title} loading="lazy" />}

        <motion.button
          className={`fav-btn ${isFavorite ? "is-active" : ""}`}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
          whileTap={{ scale: 0.85 }}       // Rebond au clic
          whileHover={{ scale: 1.15 }}     // Zoom doux au survol
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {isFavorite ? (
            <AiFillHeart color="#ff0050" size={24} />
          ) : (
            <AiOutlineHeart color="#333" size={24} />
          )}
        </motion.button>
      </div>

      <div className="card-body">
        <h3 className="card-title" title={title}>
          {title || "Sans titre"}
        </h3>
        <p className="card-desc">
          {description?.trim() || "Aucune description disponible."}
        </p>
      </div>
    </article>
  );
};

export default memo(Card);
