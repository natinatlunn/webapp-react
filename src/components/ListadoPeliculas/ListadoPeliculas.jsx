import TarjetaPelicula from "../tarjetaPelicula/TarjetaPelicula";
import peliculas from "../../data/peliculas.json";
import "./ListadoPeliculas.css";

export default function ListadoPeliculas() {
  return (
    <div className="peliculas-layout">
      <div className="peliculas-grid">
        {peliculas.map((pelicula) => {
          return <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />;
        })}
      </div>
    </div>
  );
}
