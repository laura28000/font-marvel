import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import "./Characters.css";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [favorites, setFavorites] = useState(getFavorites("characters"));

  const navigate = useNavigate();
  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/characters`,
          {
            params: { name: search, page },
          }
        );
        setCharacters(response.data.results);
        setCount(response.data.count);
      } catch (error) {
        console.error("Erreur lors du chargement des personnages :", error);
      }
    };

    fetchData();
  }, [search, page]);

  const handleFavoriteToggle = (characterId) => {
    const updated = favorites.includes(characterId)
      ? favorites.filter((id) => id !== characterId)
      : [...favorites, characterId];
    setFavorites(updated);
    saveFavorites("characters", updated);
  };

  return (
    <main className="characters-page">
      <h2>Personnages Marvel</h2>

      <SearchBar
        placeholder="Rechercher un personnage..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="cards-container">
        {characters.map((char) => {
          const charId = char._id || char.id; // Sécurité
          const imageUrl = `${char.thumbnail.path}/portrait_fantastic.${char.thumbnail.extension}`.replace(
            "http://",
            "https://"
          );

          // Ignore les images placeholder
          if (char.thumbnail.path.includes("image_not_available")) return null;

          return (
            <Card
              key={charId}
              image={imageUrl}
              title={char.name}
              description={char.description}
              isFavorite={favorites.includes(charId)}
              onToggleFavorite={() => handleFavoriteToggle(charId)}
              onClick={() => navigate(`/character/${charId}`)}
            />
          );
        })}
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(count / limit)}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </main>
  );
};

export default Characters;


