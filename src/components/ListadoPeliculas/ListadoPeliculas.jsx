import TarjetaPelicula from "../tarjetaPelicula/TarjetaPelicula";
import peliculas from "../../data/peliculas.json";
import "./ListadoPeliculas.css";

export default function ListadoPeliculas({ peliculasFiltradas }) {
  const peliculasAMostrar = peliculasFiltradas ?? peliculas;

  return (
    <div className="peliculas-layout">
      <div className="peliculas-grid">
        {peliculasAMostrar.map((pelicula) => {
          return <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />;
        })}
      </div>
    </div>
  );
}
