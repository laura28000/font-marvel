import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Characters from "./Pages/Characters";
import Comics from "./Pages/Comics";
import CharacterDetail from "./Pages/CharacterDetail"; 
import Favorites from "./Pages/Favorites";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";      // ✅ Ajouté
import Signup from "./Pages/Signup";    // ✅ Ajouté

import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />     {/* ✅ Ajoutée */}
        <Route path="/signup" element={<Signup />} />   {/* ✅ Ajoutée */}
      </Routes>
    </Router>
  );
}

export default App;
