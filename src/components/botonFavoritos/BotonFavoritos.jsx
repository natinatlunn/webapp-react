import { useContext } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AutContext from "../../store/AutContext";

export default function BotonFavoritos({ favorito, alHacerClic }) {
  const authContext = useContext(AutContext);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {!authContext.usuarioLogueado
        ? "Inicia sesión para guardar favoritos"
        : favorito
          ? "Quitar de favoritos"
          : "Guardar en favoritos"}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <i
        className={`bi ${favorito ? "bi-heart-fill text-danger" : "bi-heart"} ${
          authContext.usuarioLogueado ? "" : "text-secondary"
        }`}
        onClick={authContext.usuarioLogueado ? alHacerClic : undefined}
        style={{
          cursor: authContext.usuarioLogueado ? "pointer" : "not-allowed",
          transition: "all 0.2s",
        }}
      />
    </OverlayTrigger>
  );
}
