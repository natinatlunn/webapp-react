import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import peliculas from '../../data/peliculas.json';
import "./FiltroBusqueda.css";

function FiltroBusqueda(props) {
  const textoNormalizado = props.valor.trim().toLowerCase();
  const categorias = [...new Set(peliculas.flatMap((p) => p.genero))].sort();

  const sugerencias = categorias.filter((categoria) =>
    categoria.toLowerCase().includes(textoNormalizado),
  );

  const mostrarSugerencias = textoNormalizado.length > 0 && sugerencias.length > 0;

  return (
    <div className="filtro-busqueda">
      <Form className="zona-buscador" onSubmit={props.onEnviar}>
        <Form.Control
          type="text"
          placeholder="Buscar por categoría..."
          value={props.valor}
          onChange={props.onCambio}
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