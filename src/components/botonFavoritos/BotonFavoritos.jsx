import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function BotonFavoritos({
  favorito,
  alHacerClic,
  bloqueado = false,
}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {bloqueado
        ? "Inicia sesión para guardar favoritos"
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
          bloqueado ? "text-secondary" : ""
        }`}
        onClick={bloqueado ? "" : alHacerClic}
        style={{
          cursor: bloqueado ? "not-allowed" : "pointer",
          transition: "all 0.2s",
        }}
      />
    </OverlayTrigger>
  );
}
