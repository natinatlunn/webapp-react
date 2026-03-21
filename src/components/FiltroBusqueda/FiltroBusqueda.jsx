import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import peliculas from "../../data/peliculas.json";
import "./FiltroBusqueda.css";

function FiltroBusqueda(props) {
  const [estaEnFoco, setEstaEnFoco] = useState(false);

  const textoNormalizado = props.valor.trim().toLowerCase();
  const categorias = [...new Set(peliculas.flatMap((p) => p.genero))].sort();

  const sugerencias = categorias.filter((categoria) =>
    categoria.toLowerCase().includes(textoNormalizado),
  );

  const mostrarSugerencias =
    estaEnFoco && textoNormalizado.length > 0 && sugerencias.length > 0;

  const manejarBlur = () => {
    setTimeout(() => {
      setEstaEnFoco(false);
    }, 200);
  };

  return (
    <div className="filtro-busqueda">
      <Form className="zona-buscador" onSubmit={props.onEnviar}>
        <Form.Control
          type="text"
          placeholder="Buscar por categoría..."
          value={props.valor}
          onChange={props.onCambio}
          onFocus={() => setEstaEnFoco(true)}
          onBlur={manejarBlur}
          autoComplete="off"
        />
        <Button variant="primary" type="submit" aria-label="Buscar">
          <i className="bi bi-search"></i>
        </Button>
      </Form>

      {mostrarSugerencias && (
        <ul className="lista-sugerencias">
          {sugerencias.map((categoria) => (
            <li
              key={categoria}
              onClick={() => props.onSugerenciaClick(categoria)}
              onKeyDown={(evento) => {
                if (evento.key === "Enter") {
                  props.onSugerenciaClick(categoria);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {categoria}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FiltroBusqueda;
