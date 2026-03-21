import BotonFavoritos from "../botonFavoritos/BotonFavoritos";
import "./TarjetaPelicula.css";
import { Link } from "react-router-dom";
import { Card, Badge, Stack, CardBody } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { obtenerPuntuacionMedia } from "../obtenerPuntuacionMedia";
import AutContext from "../../store/AutContext";

export default function TarjetaPelicula({ pelicula }) {
  const [puntuacionMedia, setPuntuacionMedia] = useState(0);
  const authContext = useContext(AutContext);

  authContext.onComprobarSesionExpirada();

  const handleToggleFavorito = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();

    if (!authContext.usuarioLogueado) {
      window.alert("Debes iniciar sesion para guardar peliculas en favoritos.");
      return;
    }

    authContext.onToggleFavorito?.(pelicula.id);
  };

  useEffect(() => {
    obtenerPuntuacionMedia(pelicula.id).then((media) => {
      setPuntuacionMedia(media);
    });
  }, [pelicula.id]);

  return (
    <Card
      as={Link}
      to={`/ficha/${pelicula.id}`}
      className="card-pelicula text-decoration-none"
    >
      <Card.Img
        variant="top"
        src={`/images/portadas/${pelicula.portada}`}
        alt={`Portada de ${pelicula.titulo}`}
      />
      <Card.Body
        className="text-bg-dark rounded-bottom"
        style={{
          backgroundImage: "var(--bs-gradient)",
        }}
      >
        <Stack
          direction="horizontal"
          gap={1}
          className="justify-content-between align-items-start"
        >
          <Card.Text className="text-truncate" title={pelicula.titulo}>
            {pelicula.titulo}
          </Card.Text>

          <Stack
            direction="horizontal"
            gap={2}
            className="align-items-center flex-shrink-0"
          >
            <div onClick={(e) => e.preventDefault()}>
              <BotonFavoritos
                usuarioLogueado={authContext.usuarioLogueado}
                esFavorito={authContext.favoritos.includes(pelicula.id)}
                alHacerClic={handleToggleFavorito}
              />
            </div>
            <Badge bg="dark" className="border">
              {Number(puntuacionMedia).toFixed(1)}
            </Badge>
          </Stack>
        </Stack>

        <Stack direction="horizontal" gap={2} className="flex-wrap">
          {pelicula.genero.map((gen) => (
            <Badge key={gen} pill bg="secondary">
              {gen}
            </Badge>
          ))}
        </Stack>
      </Card.Body>
    </Card>
  );
}
