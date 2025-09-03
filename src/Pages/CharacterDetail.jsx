import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import "./CharacterDetail.css";

const CharacterDetail = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [favorites, setFavorites] = useState(getFavorites("comics"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Infos du personnage
        const charResponse = await axios.get(`https://TON_BACKEND_URL/character/${id}`);
        setCharacter(charResponse.data);

        // 2. Comics liés au personnage
        const comicsResponse = await axios.get(`https://TON_BACKEND_URL/comics`, {
          params: {
            characterId: id,
          },
        });
        setComics(comicsResponse.data.results);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, [id]);

  const handleFavoriteToggle = (comicId) => {
    let updated;
    if (favorites.includes(comicId)) {
      updated = favorites.filter((id) => id !== comicId);
    } else {
      updated = [...favorites, comicId];
    }
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
                  image={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
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
