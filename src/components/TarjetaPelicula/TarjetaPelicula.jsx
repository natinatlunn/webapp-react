import BotonFavoritos from "../botonFavoritos/BotonFavoritos";
import "./TarjetaPelicula.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerPuntuacionMedia } from "../obtenerPuntuacionMedia";

export default function TarjetaPelicula({
  pelicula,
  esFavorito = false,
  onToggleFavorito,
  usuarioPuedeGuardarFavoritos = false,
}) {
  const [puntuacionMedia, setPuntuacionMedia] = useState(0);

  const handleToggleFavorito = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();

    if (!usuarioPuedeGuardarFavoritos) {
      window.alert("Debes iniciar sesion para guardar peliculas en favoritos.");
      return;
    }

    onToggleFavorito?.(pelicula.id);
  };

  useEffect(() => {
    obtenerPuntuacionMedia(pelicula.id).then((media) => {
      setPuntuacionMedia(media);
    });
  }, [pelicula.id]);
  return (
    <Link
      to={`/ficha/${pelicula.id}`}
      className="card card-pelicula text-decoration-none"
    >
      <img
        src={`/images/${pelicula.portada}`}
        className="card-img-top"
        alt={`Portada de ${pelicula.titulo}`}
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
              bloqueado={!usuarioPuedeGuardarFavoritos}
            />
            <span className="badge text-bg-dark border">
              {Number(puntuacionMedia).toFixed(1)}
            </span>
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {pelicula.genero.map((gen) => (
            <span key={gen} className="badge rounded-pill text-bg-secondary">
              {gen}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
