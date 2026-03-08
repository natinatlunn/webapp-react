import BotonFavoritos from "../botonFavoritos/BotonFavoritos";
import "./TarjetaPelicula.css";
import { useState } from "react";

export default function TarjetaPelicula(props) {
  const pelicula = props.pelicula;

  const [esFavorito, setEsFavorito] = useState(false);

  const handleToggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className="col" key={pelicula.id}>
      <div className="card card-pelicula">
        <img
          src={`/images/${pelicula.portada}`}
          className="card-img-top"
          alt="..."
        />
        <div
          className="card-body text-bg-dark rounded-bottom"
          style={{
            backgroundImage: "var(--bs-gradient)",
          }}
        >
          <div className="d-flex justify-content-between align-items-start gap-1">
            <p className="card-text text-truncate" title={pelicula.titulo}>
              {pelicula.titulo}
            </p>
            <div className="d-flex align-items-center gap-2">
              <BotonFavoritos
                favorito={esFavorito}
                alHacerClic={handleToggleFavorito}
              />
              <span className="badge text-bg-dark border">7.0</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            {pelicula.genero.map((gen) => (
              <span className="badge rounded-pill text-bg-secondary">
                {gen}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
