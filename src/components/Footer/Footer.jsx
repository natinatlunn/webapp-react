import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer-app py-2">
      <Container>
        <Row className="gy-3 align-items-center">
          <Col xs={12} md={4} className="text-center text-md-start">
            <span
              className="text-white fw-bold fs-4 d-block mb-1"
              style={{ letterSpacing: "-0.5px" }}
            >
              FLIXI
            </span>
            <span className="text-secondary small">
              © {anioActual} Todos los derechos reservados.
            </span>
          </Col>

          <Col xs={12} md={4}>
            <Nav className="justify-content-center gap-4">
              <Link
                to="/Paginas/InfoContacto"
                className="text-white text-decoration-none fw-medium fs-5 nav-link-hover"
              >
                Contacto
              </Link>
              <Link
                to="/Paginas/AvisoLegal"
                className="text-white text-decoration-none fw-medium fs-5 nav-link-hover"
              >
                Aviso Legal
              </Link>
            </Nav>
          </Col>

          <Col xs={12} md={4} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
