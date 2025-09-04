import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Ajouté
import axios from "axios";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import "./Comics.css";

const API_URL = import.meta.env.VITE_API_URL;

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [favorites, setFavorites] = useState(getFavorites("comics"));

  const navigate = useNavigate(); // ✅ Ajouté

  const limit = 100;

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/comics`, {
          params: { title: search, page },
        });

        const sorted = [...data.results].sort((a, b) =>
          (a.title || "").localeCompare(b.title || "")
        );
        setComics(sorted);
        setCount(data.count || 0);
      } catch (error) {
        console.error("Erreur lors de la récupération des comics :", error);
      }
    };

    fetchComics();
  }, [API_URL, search, page]);

  const handleFavoriteToggle = (comicId) => {
    setFavorites((prev) => {
      const updated = prev.includes(comicId)
        ? prev.filter((id) => id !== comicId)
        : [...prev, comicId];
      saveFavorites("comics", updated);
      return updated;
    });
  };

  const totalPages = Math.max(1, Math.ceil((count || 0) / limit));

  return (
    <main>
      <h2>Comics Marvel</h2>

      <SearchBar
        placeholder="Rechercher un comic..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div class
