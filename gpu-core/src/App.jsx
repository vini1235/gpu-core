import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Catalogo from "./pages/Catalogo";
import Carrinho from "./pages/Carrinho";
import DetalhesProduto from "./pages/DetalhesProduto";
import Inicio from "./pages/Inicio";
import Ranking from "./pages/Ranking";

function RolagemAoTopo() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <RolagemAoTopo />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/produtos" element={<Catalogo />} />
        <Route path="/produtos/:id" element={<DetalhesProduto />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
