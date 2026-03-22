import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import TarjetaPelicula from "../../components/tarjetaPelicula/TarjetaPelicula";
import peliculas from "../../data/peliculas.json";
import "./PeliculasCategorias.css";

export default function PeliculasCategoria() {
  const { categoria = "" } = useParams();
  const categoriaDecodificada = decodeURIComponent(categoria);
  const categoriaNormalizada = categoriaDecodificada.trim().toLowerCase();

  const peliculasFiltradas = useMemo(
    () =>
      peliculas.filter((pelicula) =>
        pelicula.genero.some(
          (genero) => genero.toLowerCase() === categoriaNormalizada,
        ),
      ),
    [categoriaNormalizada],
  );

  return (
    <Container className="py-4 mt-2">
      <header className="text-center mb-3">
        <h1 className="fw-light text-dark display-5 mt-2 mb-3">
          {"Categoría: " + categoriaDecodificada || "Sin categoría"}
        </h1>
        <div
          className="mx-auto bg-flixi-line"
          style={{ width: "40px", height: "2px" }}
        ></div>
      </header>

      <section>
        {peliculasFiltradas.length > 0 ? (
          <section className="peliculas-layout">
            <div className="peliculas-grid">
              {peliculasFiltradas.map((pelicula) => (
                <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center">
            <p className="fs-5 text-muted fw-light italic">
              No disponemos de películas para esta categoría
            </p>
          </div>
        )}
      </section>
    </Container>
  );
}
