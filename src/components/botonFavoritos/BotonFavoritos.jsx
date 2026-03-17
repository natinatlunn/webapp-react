export default function BotonFavoritos({ favorito, alHacerClic, bloqueado = false }) {
  return (
    <i
      className={`bi ${favorito ? "bi-heart-fill text-danger" : "bi-heart"} ${
        bloqueado ? "text-secondary" : ""
      }`}
      onClick={alHacerClic}
      title={bloqueado ? "Inicia sesion para guardar favoritos" : "Guardar en favoritos"}
      style={{ cursor: "pointer", transition: "all 0.2s" }}
    />
  );
}
