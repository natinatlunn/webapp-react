import TarjetaPelicula from "../tarjetaPelicula/TarjetaPelicula";
import peliculas from "../../data/peliculas.json";
import "./ListadoPeliculas.css";
import { useState } from "react";
import { Container, Button } from "react-bootstrap";

export default function ListadoPeliculas({ peliculasFiltradas }) {
  const peliculasAMostrar = peliculasFiltradas ?? peliculas;
  const [mostrar, setMostrar] = useState(false);

  function handleMostrarPeliculas() {
    setMostrar(!mostrar);
  }

  return (
    <Container className="peliculas-layout py-3 mb-3">
      <div className="d-flex align-items-center mb-4 ps-2">
        <Button
          onClick={handleMostrarPeliculas}
          variant="link"
          className="p-0 d-flex align-items-center text-decoration-none shadow-none btn-control-listado"
        >
          <i
            className={`bi bi-chevron-${mostrar ? "up" : "down"} me-2 icon-arrow-small`}
          ></i>
          <span className="text-uppercase ls-1-5 fw-medium label-control">
            {mostrar ? "Contraer" : "Expandir catálogo"}
          </span>
        </Button>
      </div>

      {mostrar && (
        <div className="peliculas-grid">
          {peliculasAMostrar.map((pelicula) => (
            <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />
          ))}
        </div>
      )}
    </Container>
  );
}
