import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AvisoLegal from "./pages/AvisoLegal";
import InfoContacto from "./pages/InfoContacto";
import PeliculasCategoria from "./pages/PeliculasCategoria";
import { Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import Footer from "./components/Footer/Footer";
import PaginaPrincipal from "./pages/PaginaPrincipal";

function App() {
 return (
  <Container fluid className="p-0 d-flex flex-column min-vh-100">
    <Row className="g-0">
      <Col xs={12} className="p-0">
        <BarraNavegacion />
      </Col>
    </Row>

    <Row className="flex-grow-1">
      <Col>
    
        <Routes>
          <Route index element={<PaginaPrincipal />} />
          <Route path="/categoria/:categoria" element={<PeliculasCategoria />} />
          <Route path="/Paginas/AvisoLegal" element={<AvisoLegal />} />
          <Route path="/Paginas/InfoContacto" element={<InfoContacto />} />
          
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
