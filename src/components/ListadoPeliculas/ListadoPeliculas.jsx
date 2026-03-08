import TarjetaPelicula from "../tarjetaPelicula/TarjetaPelicula";
import peliculas from "../../data/peliculas.json";

export default function ListadoPeliculas() {
  return (
    <div className="container-fluid p-4">
      <div className="row d-flex flex-wrap justify-content-center gap-4 p-3">
        {peliculas.map((pelicula) => {
          return <TarjetaPelicula pelicula={pelicula} />;
        })}
      </div>
    </div>
  );
}
