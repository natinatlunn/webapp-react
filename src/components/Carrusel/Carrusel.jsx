import { Carousel, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import peliculas from "../../data/peliculas.json";
import "./Carrusel.css";

const Carrusel = () => {
  const primerasPeliculas = peliculas.slice(0, 3);

  return (
    <Container className="carrusel-container py-3" as="section">
      <Carousel
        indicators={false}
        interval={5000}
        pause="hover"
        prevIcon={<i className="bi bi-chevron-left nav-icon-custom" />}
        nextIcon={<i className="bi bi-chevron-right nav-icon-custom" />}
        className="main-carousel shadow-sm"
      >
        {primerasPeliculas.map((pelicula) => (
          <Carousel.Item key={pelicula.id}>
            <Link
              to={`/ficha/${pelicula.id}`}
              className="d-block position-relative carrusel-link"
            >
              <div className="carrusel-image-container">
                <Image
                  src={`/images/carousel/${pelicula.portada}`}
                  alt={pelicula.titulo}
                  className="d-block w-100 carrusel-img-refined"
                />

                <div className="carrusel-overlay-gradient"></div>
              </div>

              <Carousel.Caption className="custom-caption text-start px-4">
                <h2 className="display-6 fw-light text-white mt-1 mb-2">
                  {pelicula.titulo}
                </h2>
                <p
                  className="fw-light small d-none d-md-block text-white-50 lh-base"
                  style={{ maxWidth: "500px" }}
                >
                  {pelicula.sinopsis}
                </p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Carrusel;
