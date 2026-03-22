import ListadoPeliculas from "../components/ListadoPeliculas/ListadoPeliculas";
import Carrusel from "../components/Carrusel/Carrusel";

export default function PaginaPrincipal() {
  return (
    <div className="py-4">
      <h1 className="text-center fw-light text-dark display-5 mt-2 mb-3">
        Recomendados
      </h1>
      <div
        className="mx-auto bg-flixi-line"
        style={{
          width: "40px",
          height: "2px",
          backgroundColor: " #496793",
          opacity: 0.6,
        }}
      ></div>
      <Carrusel />
      <ListadoPeliculas />
    </div>
  );
}
