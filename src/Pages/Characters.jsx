import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Ajout ici
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

  const navigate = useNavigate(); // ✅ Hook de navigation
  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/characters`,
          {
            params: {
              name: search,
              page,
            },
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
    setFavorites((prev) => {
      const updated = prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId];
      saveFavorites("characters", updated);
      return updated;
    });
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
        {characters.map((char) => (
          <Card
            key={char._id}
            image={`${char.thumbnail.path}/portrait_xlarge.${char.thumbnail.extension}`.replace(
              "http://",
              "https://"
            )}
            title={char.name}
            description={char.description}
            isFavorite={favorites.includes(char._id)}
            onToggleFavorite={() => handleFavoriteToggle(char._id)}
            onClick={() => navigate(`/character/${char._id}`)} // ✅ Navigation React Router
          />
        ))}
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




