import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AvisoLegal from './Paginas/AvisoLegal';
import InfoContacto from './Paginas/InfoContacto';
import { Routes, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BarraNavegacion from './componentes/BarraNavegacion';
import Footer from './componentes/Footer';

function App() {


  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col xs={12} className="p-0">
          <BarraNavegacion/>
        </Col>
      </Row>
      <Row>
         
        <Routes>
          <Route path="/Paginas/AvisoLegal" element={<AvisoLegal />}></Route>
          <Route path="/Paginas/InfoContacto" element={<InfoContacto />} ></Route>
        </Routes>
      </Row>
      <Row>
        <Footer />
        
      </Row>
    </Container>
  )


}

export default App;
