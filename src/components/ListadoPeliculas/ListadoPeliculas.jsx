import TarjetaPelicula from "../tarjetaPelicula/TarjetaPelicula";
import peliculas from "../../data/peliculas.json";
import "./ListadoPeliculas.css";
import { useState } from "react";

export default function ListadoPeliculas({ peliculasFiltradas }) {
  const peliculasAMostrar = peliculasFiltradas ?? peliculas;
  const [mostrar, setMostrar] = useState(false);

  function handleMostrarPeliculas() {
    setMostrar(!mostrar);
  }

  return (
    <div className="peliculas-layout">
      <button onClick={handleMostrarPeliculas} className="btn btn-primary mb-3">
        {mostrar ? "Ocultar películas" : "Mostrar todas las películas"}
      </button>

      {mostrar && (
        <div className="peliculas-grid">
          {peliculasAMostrar.map((pelicula) => {
            return <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />;
          })}
        </div>
      )}
    </div>
  );
}
