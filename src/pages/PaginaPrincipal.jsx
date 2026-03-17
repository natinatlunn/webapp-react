import ListadoPeliculas from "../components/ListadoPeliculas/ListadoPeliculas";
import Carrusel from "../components/Carrusel/Carrusel";

export default function PaginaPrincipal({ usuarioActual, favoritos, onToggleFavorito }) {

  return (
    <div>
      <h1 className="text-center mt-4">Últimas Películas</h1>
      <Carrusel />
      <ListadoPeliculas
        usuarioActual={usuarioActual}
        favoritos={favoritos}
        onToggleFavorito={onToggleFavorito}
      />
    </div>

  )
}
