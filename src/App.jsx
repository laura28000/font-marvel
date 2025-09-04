// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Characters from "./Pages/Characters";
import Comics from "./Pages/Comics";
import CharacterDetail from "./Pages/CharacterDetail";
import ComicDetail from "./Pages/ComicDetail";
import Favorites from "./Pages/Favorites";
import Landing from "./Pages/Landing"; // ✅ AJOUT ICI
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} /> {/* ✅ HOME = LANDING */}
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:id" element={<ComicDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
