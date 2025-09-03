import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({
  image,
  title,
  description,
  isFavorite = false,
  onToggleFavorite,
  onClick,
}) => {
  // Forcer HTTPS pour éviter les soucis sur Netlify
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
        {secureSrc && (
          <img src={secureSrc} alt={title} loading="lazy" />
        )}

        <button
          className={`fav-btn ${isFavorite ? "is-active" : ""}`}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
        >
          {isFavorite ? "💖" : "🤍"}
        </button>
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

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
  onClick: PropTypes.func,
};

export default memo(Card);
