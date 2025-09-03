import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import "./CharacterDetail.css";

const API = import.meta.env.VITE_API_URL; // <- Assure-toi qu’il est bien défini

const CharacterDetail = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [favorites, setFavorites] = useState(getFavorites("comics"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔍 Fetching from:", `${API}/character/${id}`);

        const charResponse = await axios.get(`${API}/character/${id}`);
        setCharacter(charResponse.data);

        const comicsResponse = await axios.get(`${API}/comics`, {
          params: { characterId: id },
        });
        setComics(comicsResponse.data.results);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, [id, API]);

  const handleFavoriteToggle = (comicId) => {
    const updated = favorites.includes(comicId)
      ? favorites.filter((id) => id !== comicId)
      : [...favorites, comicId];

    setFavorites(updated);
    saveFavorites("comics", updated);
  };

  return (
    <main>
      {character ? (
        <>
          <section className="character-header">
            <img
              src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <div>
              <h2>{character.name}</h2>
              <p>{character.description || "Pas de description disponible."}</p>
            </div>
          </section>

          <section className="comics-list">
            <h3>Comics liés à ce personnage :</h3>
            <div className="cards-container">
              {comics.map((comic) => (
                <Card
                  key={comic._id}
                  image={`${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`}
                  title={comic.title}
                  description={comic.description}
                  isFavorite={favorites.includes(comic._id)}
                  onToggleFavorite={() => handleFavoriteToggle(comic._id)}
                  onClick={() => {}}
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </main>
  );
};

export default CharacterDetail;
