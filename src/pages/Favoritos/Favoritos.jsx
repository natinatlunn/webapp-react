import peliculas from "../../data/peliculas.json";
import TarjetaPelicula from "../../components/tarjetaPelicula/TarjetaPelicula";
import "../../components/ListadoPeliculas/ListadoPeliculas.css";
import { useContext } from "react";
import AutContext from "../../store/AutContext";
import { Container } from "react-bootstrap";
import "./Favoritos.css";

function Favoritos() {
  const authContext = useContext(AutContext);

  authContext.onComprobarSesionExpirada();

  if (!authContext.usuarioLogueado) {
    return (
      <Container className="py-4 text-center">
        <header className="mb-3">
          <h1 className="fw-light text-dark display-5 mt-2 mb-3">
            Mis favoritos
          </h1>
          <div
            className="mx-auto bg-flixi-line"
            style={{ width: "40px", height: "2px" }}
          ></div>
        </header>
        <div
          className="py-5 border rounded-4 bg-light shadow-sm mx-auto"
          style={{ maxWidth: "900px" }}
        >
          <p className="fs-5 text-dark-emphasis mb-0 px-4">
            Inicia sesión para acceder a tu selección personalizada de películas
          </p>
        </div>
      </Container>
    );
  }

  const idsFavoritos = new Set(authContext.favoritos);
  const peliculasFavoritas = peliculas.filter((pelicula) =>
    idsFavoritos.has(pelicula.id),
  );

  return (
    <Container className="py-4">
      <header className="text-center mb-3">
        <h1 className="fw-light text-dark display-5 mt-2 mb-3">
          Mis favoritos
        </h1>
        <div
          className="mx-auto bg-flixi-line"
          style={{ width: "40px", height: "2px" }}
        ></div>
      </header>

      {peliculasFavoritas.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-5 text-muted fw-light italic">
            Tu lista está vacía. Comienza a explorar y guarda lo que más te
            guste.
          </p>
        </div>
      ) : (
        <section className="peliculas-layout">
          <div className="peliculas-grid">
            {peliculasFavoritas.map((pelicula) => (
              <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

export default Favoritos;
