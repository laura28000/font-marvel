// src/Pages/CharacterDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import "./CharacterDetail.css";

const API = import.meta.env.VITE_API_URL;

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [favorites, setFavorites] = useState(getFavorites("comics"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔴 Appel du personnage via /character/:id
        const response = await axios.get(`${API}/character/${id}`);
        setCharacter(response.data);

        // 🔴 Appel des comics liés via /comics?characterId=
        const comicsResponse = await axios.get(`${API}/comics`, {
          params: { characterId: id },
        });
        setComics(comicsResponse.data.results);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, [id]);

  const handleFavoriteToggle = (comicId) => {
    const updated = favorites.includes(comicId)
      ? favorites.filter((itemId) => itemId !== comicId)
      : [...favorites, comicId];

    setFavorites(updated);
    saveFavorites("comics", updated);
  };

  if (!character) return <p>Chargement en cours...</p>;

  const imageUrl = `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`.replace(
    "http://",
    "https://"
  );

  return (
    <main className="character-detail">
      <section className="character-header">
        <img src={imageUrl} alt={character.name} />
        <div>
          <h2>{character.name}</h2>
          <p>{character.description || "Pas de description disponible."}</p>
        </div>
      </section>

      <section className="comics-list">
        <h3>Comics liés à ce personnage :</h3>
        <div className="cards-container">
          {comics.map((comic) => {
            const image = `${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`.replace(
              "http://",
              "https://"
            );

            return (
              <Card
                key={comic._id}
                image={image}
                title={comic.title}
                description={comic.description}
                isFavorite={favorites.includes(comic._id)}
                onToggleFavorite={() => handleFavoriteToggle(comic._id)}
                onClick={() => {}}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default CharacterDetail;
