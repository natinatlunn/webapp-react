import { useState } from "react";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
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
    <div
      className="filtro-busqueda-wrapper mx-auto"
      style={{ maxWidth: "500px", width: "100%" }}
    >
      <Form onSubmit={props.onEnviar} className="position-relative">
        <InputGroup className="search-group-premium shadow-none">
          <InputGroup.Text className="bg-transparent border-0 pe-0">
            <i className="bi bi-search text-muted small"></i>
          </InputGroup.Text>

          <Form.Control
            type="text"
            placeholder="Buscar por género..."
            value={props.valor}
            onChange={props.onCambio}
            onFocus={() => setEstaEnFoco(true)}
            onBlur={manejarBlur}
            autoComplete="off"
            className="search-input-minimal border-0 bg-transparent shadow-none"
          />
        </InputGroup>

        {mostrarSugerencias && (
          <ListGroup className="suggestions-box border-0 shadow-sm mt-1">
            {sugerencias.map((categoria) => (
              <ListGroup.Item
                key={categoria}
                action
                onClick={() => props.onSugerenciaClick(categoria)}
                className="suggestion-item-minimal border-0 py-2"
              >
                <span className="suggestion-text-style">{categoria}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form>
    </div>
  );
}

export default FiltroBusqueda;
