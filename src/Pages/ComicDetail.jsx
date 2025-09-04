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
        // ✅ Appel correct vers /comic?comicId=xxx
        const { data } = await axios.get(`${API}/comic`, {
          params: { comicId: id },
        });
        setComic(data);
      } catch (error) {
        console.error("Erreur lors du chargement du comic :", error);
      }
    };
    fetchComic();
  }, [id]);

  if (!comic) return <p>Chargement en cours...</p>;

  const url = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`.replace(
    "http://",
    "https://"
  );

  return (
    <main className="comic-detail">
      <div className="comic-container">
        <img src={url} alt={comic.title} className="comic-image" />
        <h2>{comic.title}</h2>
        <p>{comic.description || "Pas de description disponible."}</p>
      </div>
    </main>
  );
};

export default ComicDetail;
