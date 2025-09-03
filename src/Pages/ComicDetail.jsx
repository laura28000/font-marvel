// src/pages/ComicDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ComicDetail.css";

const API = import.meta.env.VITE_API_URL;

const ComicDetail = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const { data } = await axios.get(`${API}/comics`, {
          params: { comicId: id },
        });
        setComic(data.results?.[0]);
      } catch (error) {
        console.error("Erreur lors du chargement du comic :", error);
      }
    };
    fetchComic();
  }, [id]);

  if (!comic) return <p>Chargement en cours...</p>;

  const url = `${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`.replace("http://", "https://");

  return (
    <main className="comic-detail">
      <img src={url} alt={comic.title} />
      <h2>{comic.title}</h2>
      <p>{comic.description || "Pas de description disponible."}</p>
    </main>
  );
};

export default ComicDetail;

