import TarjetaPelicula from "../tarjetaPelicula/TarjetaPelicula";
import peliculas from "../../data/peliculas.json";

export default function ListadoPeliculas() {
  return (
    <div class="container-fluid">
      <div class="row d-flex flex-wrap justify-content-center gap-4 p-3">
        {peliculas.map((pelicula) => {
          return <TarjetaPelicula pelicula={pelicula} />;
        })}
      </div>
    </div>
  );
}
