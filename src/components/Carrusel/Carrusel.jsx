import { useState } from "react";
import peliculas from "../../data/peliculas.json";
import "./Carrusel.css";
import { Link } from "react-router-dom";
import { Button, Image, Container } from "react-bootstrap";

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const primerasPeliculas = peliculas.slice(0, 3);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? primerasPeliculas.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === primerasPeliculas.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const peliculaActual = primerasPeliculas[currentIndex];

  return (
    <Container
      className="carrusel"
      as="section"
      aria-label="Carrusel de peliculas destacadas"
    >
      <Button
        onClick={handlePrev}
        className="carrusel-btn prev"
        aria-label="Película anterior"
        variant="light"
      >
        ❮
      </Button>

      <Link
        to={`/ficha/${peliculaActual.id}`}
        className="carrusel-container carrusel-link"
      >
        <Image
          src={`/images/portadas/${peliculaActual.portada}`}
          alt={peliculaActual.titulo}
          className="carrusel-image"
          fluid
        />
        <div className="carrusel-info">
          <h2>{peliculaActual.titulo}</h2>
          <p>{peliculaActual.sinopsis}</p>
        </div>
      </Link>

      <Button
        onClick={handleNext}
        className="carrusel-btn next"
        aria-label="Siguiente película"
        variant="light"
      >
        ❯
      </Button>
    </Container>
  );
};

export default Carrusel;
