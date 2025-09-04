import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import "./Favorites.css";

const API = import.meta.env.VITE_API_URL;

const Favorites = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const characterIds = getFavorites("characters");
        const comicIds = getFavorites("comics");

        if (characterIds.length > 0) {
          const responseChar = await axios.post(`${API}/favorites/characters`, {
            ids: characterIds,
          });
          setFavoriteCharacters(responseChar.data.results);
        }

        if (comicIds.length > 0) {
          const responseComics = await axios.post(`${API}/favorites/comics`, {
            ids: comicIds,
          });
          setFavoriteComics(responseComics.data.results);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = (type, id) => {
    if (type === "characters") {
      const updated = getFavorites("characters").filter((itemId) => itemId !== id);
      saveFavorites("characters", updated);
      setFavoriteCharacters((prev) => prev.filter((item) => item._id !== id));
    }

    if (type === "comics") {
      const updated = getFavorites("comics").filter((itemId) => itemId !== id);
      saveFavorites("comics", updated);
      setFavoriteComics((prev) => prev.filter((item) => item._id !== id));
    }
  };

  return (
    <main>
      <h2>Mes favoris</h2>

      <section>
        <h3>Personnages</h3>
        <div className="cards-container">
          {favoriteCharacters.length > 0 ? (
            favoriteCharacters.map((char) => (
              <Card
                key={char._id}
                image={`${char.thumbnail.path}/portrait_xlarge.${char.thumbnail.extension}`.replace(
                  "http://",
                  "https://"
                )}
                title={char.name}
                description={char.description}
                isFavorite={true}
                onToggleFavorite={() => handleRemoveFavorite("characters", char._id)}
                onClick={() => navigate(`/character/${char._id}`)}
              />
            ))
          ) : (
            <p>Aucun personnage en favori.</p>
          )}
        </div>
      </section>

      <section>
        <h3>Comics</h3>
        <div className="cards-container">
          {favoriteComics.length > 0 ? (
            favoriteComics.map((comic) => (
              <Card
                key={comic._id}
                image={
                  comic.thumbnail
                    ? `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`.replace(
                        "http://",
                        "https://"
                      )
                    : (comic.picture || "").replace("http://", "https://")
                }
                title={comic.title}
                description={comic.description}
                isFavorite={true}
                onToggleFavorite={() => handleRemoveFavorite("comics", comic._id)}
                onClick={() => navigate(`/comic/${comic._id}`)}
              />
            ))
          ) : (
            <p>Aucun comic en favori.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Favorites;
