import peliculas from "../data/peliculas.json";
import TarjetaPelicula from "../components/tarjetaPelicula/TarjetaPelicula";
import "../components/ListadoPeliculas/ListadoPeliculas.css";
import { useContext } from "react";
import AutContext from "../store/AutContext";

function Favoritos() {
  const authContext = useContext(AutContext);

  authContext.onComprobarSesionExpirada();

  if (!authContext.usuarioLogueado) {
    return (
      <section className="peliculas-layout text-center py-5">
        <h1>Favoritos</h1>
        <p>Inicia sesion para ver tus peliculas favoritas.</p>
      </section>
    );
  }

  const idsFavoritos = new Set(authContext.favoritos);

  const peliculasFavoritas = peliculas.filter((pelicula) =>
    idsFavoritos.has(pelicula.id),
  );

  return (
    <section className="peliculas-layout">
      <h1 className="text-center mt-4 mb-4">Mis favoritos</h1>
      {peliculasFavoritas.length === 0 ? (
        <p className="text-center">Todavia no tienes peliculas favoritas.</p>
      ) : (
        <div className="peliculas-grid">
          {peliculasFavoritas.map((pelicula) => (
            <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Favoritos;
