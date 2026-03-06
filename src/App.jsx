import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BarraNavegacion from './componentes/BarraNavegacion';

function App() {


  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col xs={12} className="p-0">
          <BarraNavegacion/>
        </Col>
      </Row>
      <Row>
        Para el carrusel
      </Row>
      <Row>
        Footer
      </Row>
    </Container>
  )


}

export default App
