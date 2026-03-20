import { Link, useParams } from "react-router-dom";
import FichaPeliculaDetalle from "../components/FichaPelicula/FichaPelicula";
import peliculas from "../data/peliculas.json";

export default function FichaPelicula({ favoritos = [], onToggleFavorito }) {
  const { id = "" } = useParams();
  const pelicula = peliculas.find((item) => item.id === Number(id));

  if (!pelicula) {
    return (
      <section className="container py-5">
        <h1 className="text-center mb-3">Película no encontrada</h1>
        <p className="text-center text-secondary mb-4">
          No existe una película con el identificador solicitado.
        </p>
        <div className="text-center">
          <Link to="/" className="btn btn-dark">
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <FichaPeliculaDetalle
      pelicula={pelicula}
      esFavorito={favoritos.includes(pelicula.id)}
      onToggleFavorito={onToggleFavorito}
    />
  );
}
