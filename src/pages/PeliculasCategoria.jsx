import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ListadoPeliculas from "../components/ListadoPeliculas/ListadoPeliculas";
import peliculas from "../data/peliculas.json";

export default function PeliculasCategoria() {
  const { categoria = "" } = useParams();
  const categoriaDecodificada = decodeURIComponent(categoria);
  const categoriaNormalizada = categoriaDecodificada.trim().toLowerCase();

  const peliculasFiltradas = useMemo(
    () =>
      peliculas.filter((pelicula) =>
        pelicula.genero.some(
          (genero) => genero.toLowerCase() === categoriaNormalizada,
        ),
      ),
    [categoriaNormalizada],
  );

  return (
    <section>
      <h1 className="text-center mt-4">
        Categoría: {categoriaDecodificada || "Sin categoría"}
      </h1>

      {peliculasFiltradas.length > 0 ? (
        <ListadoPeliculas peliculasFiltradas={peliculasFiltradas} />
      ) : (
        <p className="text-center mt-4">
          No hay películas para esta categoría.
        </p>
      )}
    </section>
  );
}
