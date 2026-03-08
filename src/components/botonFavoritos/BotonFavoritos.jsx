export default function BotonFavoritos({ favorito, alHacerClic }) {
  return (
    <i
      className={`bi ${favorito ? "bi-heart-fill text-danger" : "bi-heart"}`}
      onClick={alHacerClic}
      style={{ cursor: "pointer", transition: "all 0.2s" }}
    />
  );
}
