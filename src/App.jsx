import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Produtos from "./pages/Produtos.jsx";
import Contato from "./pages/Contato.jsx";

const TEMAS = ["dark", "light", "ocean", "sunset"];
const TEMA_LABELS = {
  dark: "Tema: Dark",
  light: "Tema: Light",
  ocean: "Tema: Ocean",
  sunset: "Tema: Sunset",
};

export default function App() {
  const [tema, setTema] = useState(
    () => localStorage.getItem("tema") || "dark",
  );
  const [carrinho, setCarrinho] = useState(() =>
    JSON.parse(localStorage.getItem("carrinho") || "[]"),
  );

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", tema);
    html.setAttribute("data-bs-theme", tema === "light" ? "light" : "dark");
    localStorage.setItem("tema", tema);
  }, [tema]);

  function alterarTema() {
    const idx = TEMAS.indexOf(tema);
    setTema(TEMAS[(idx + 1) % TEMAS.length]);
  }

  function salvarCarrinho(novoCarrinho) {
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
  }

  return (
    <BrowserRouter>
      <Navbar temaLabel={TEMA_LABELS[tema]} alterarTema={alterarTema} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/produtos"
          element={
            <Produtos carrinho={carrinho} onSalvarCarrinho={salvarCarrinho} />
          }
        />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  );
}
