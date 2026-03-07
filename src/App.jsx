import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AvisoLegal from "./pages/AvisoLegal";
import InfoContacto from "./pages/InfoContacto";
import { Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BarraNavegacion from "./components/BarraNavegacion";
import Footer from "./components/Footer";
import PaginaPrincipal from "./pages/PaginaPrincipal";

function App() {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col xs={12} className="p-0">
          <BarraNavegacion />
        </Col>
      </Row>
      <Row>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/Paginas/AvisoLegal" element={<AvisoLegal />} />
          <Route path="/Paginas/InfoContacto" element={<InfoContacto />} />
        </Routes>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

export default App;
