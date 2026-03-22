import { Container, Row, Col, Card } from "react-bootstrap";
import "./InfoContacto.css";

function InfoContacto() {
  return (
    <Container className="py-3 my-3">
      <div className="text-center mb-5">
        <h1 className="fw-light text-dark display-5 mt-2 mb-3">
          Información de contacto
        </h1>
        <div
          className="mx-auto bg-flixi-line"
          style={{ width: "40px", height: "2px" }}
        ></div>
        <p className="text-muted fs-5 mt-3">
          Si tienes alguna pregunta o necesitas asistencia, no dudes en
          contactarnos
        </p>
      </div>

      <Row className="g-4 justify-content-center">
        <Col xs={12} md={4}>
          <Card
            className="h-100 border-0 shadow-sm text-center p-4 py-5"
            style={{ borderRadius: "16px", backgroundColor: "#fdfdfd" }}
          >
            <div className="mb-3 text-primary">
              <i className="bi bi-envelope-fill fs-1" />
            </div>
            <Card.Body className="p-0">
              <Card.Title className="fw-bold mb-2">Email</Card.Title>
              <a
                href="mailto:info@flixi.com"
                className="text-secondary text-decoration-none fs-5 fw-medium"
              >
                info@flixi.com
              </a>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card
            className="h-100 border-0 shadow-sm text-center p-4 py-5"
            style={{ borderRadius: "16px", backgroundColor: "#fdfdfd" }}
          >
            <div className="mb-3 text-primary">
              <i className="bi bi-telephone-fill fs-1"></i>
            </div>
            <Card.Body className="p-0">
              <Card.Title className="fw-bold mb-2">Teléfono</Card.Title>
              <p className="text-dark fs-5 fw-medium mb-0">+34 91 123 45 67</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card
            className="h-100 border-0 shadow-sm text-center p-4 py-5"
            style={{ borderRadius: "16px", backgroundColor: "#fdfdfd" }}
          >
            <div className="mb-3 text-primary">
              <i className="bi bi-geo-alt-fill fs-1"></i>
            </div>
            <Card.Body className="p-0">
              <Card.Title className="fw-bold mb-2">Dirección</Card.Title>
              <p className="text-dark fs-5 fw-medium mb-0">
                C/ Alcorcón, 123, Madrid
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default InfoContacto;
