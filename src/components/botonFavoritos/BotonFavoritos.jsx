import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function BotonFavoritos({
  usuarioLogueado,
  esFavorito,
  alHacerClic,
}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {!usuarioLogueado
        ? "Inicia sesión para guardar favoritos"
        : esFavorito
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
        className={`bi ${esFavorito ? "bi-heart-fill text-danger" : "bi-heart"} ${
         usuarioLogueado ? "" : "text-secondary"
        }`}
        onClick={usuarioLogueado ? alHacerClic : undefined}
        style={{
          cursor: usuarioLogueado ? "pointer" : "not-allowed",
          transition: "all 0.2s",
        }}
      />
    </OverlayTrigger>
  );
}
