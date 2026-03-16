import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// páginas
import AvisoLegal from "./pages/AvisoLegal";
import InfoContacto from "./pages/InfoContacto";
import PeliculasCategoria from "./pages/PeliculasCategoria";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import FichaPelicula from "./pages/FichaPelicula";
import Favoritos from "./pages/Favoritos.jsx";
// elementos bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//componentes
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import Footer from "./components/Footer/Footer";


function App() {
  const [usuarioActual, setUsuarioActual] = useState(() => {
  const sesionGuardada = localStorage.getItem("usuarioActual");

  if (!sesionGuardada) {
    return null;
  }

  try {
    return JSON.parse(sesionGuardada);
  } catch {
    localStorage.removeItem("usuarioActual");
    return null;
  }
 });

 const manejarInicioSesion = (usuario) => {
  setUsuarioActual(usuario);
  localStorage.setItem("usuarioActual", JSON.stringify(usuario));
 };

 const manejarCerrarSesion = () => {
  setUsuarioActual(null);
  localStorage.removeItem("usuarioActual");
 };

 return (
  <Container fluid className="p-0 d-flex flex-column min-vh-100">
    <Row className="g-0">
      <Col xs={12} className="p-0">
        <BarraNavegacion
          usuarioActual={usuarioActual}
          onInicioSesion={manejarInicioSesion}
          onCerrarSesion={manejarCerrarSesion}
        />
      </Col>
    </Row>

    <Row className="flex-grow-1">
      <Col>
    
        <Routes>
          <Route index element={<PaginaPrincipal />} />
          <Route path="/categoria/:categoria" element={<PeliculasCategoria />} />
          <Route path="/paginas/AvisoLegal" element={<AvisoLegal />} />
          <Route path="/paginas/InfoContacto" element={<InfoContacto />} />
          <Route path="/ficha/:id" element={<FichaPelicula />} />
          <Route path="/favoritos" element={<Favoritos usuarioActual={usuarioActual} />} />
        </Routes>
      </Col>
    </Row>

    <Row className="mt-auto">
      <Col className="p-0">
        <Footer />
      </Col>
    </Row>

  </Container>
)
}

export default App;
