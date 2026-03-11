import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import peliculas from '../../data/peliculas.json';
import "./FiltroBusqueda.css";

function FiltroBusqueda(props) {

  const categorias = [...new Set(peliculas.flatMap(p => p.genero))];

  const sugerencias = categorias.filter(categoria =>
    categoria.toLowerCase().includes(props.valor.toLowerCase())
  );

  return (
    <div>
      <Form className="zona-buscador" onSubmit={props.onEnviar}>
        <Form.Control
          type="text"
          placeholder="Buscar por categoría..."
          value={props.valor}
          onChange={props.onCambio}
        />
        <Button variant="primary" type="submit" aria-label="Buscar">
          <i className="bi bi-search"></i>
        </Button>
      </Form>


      {props.valor && (
        <ul className="lista-sugerencias">
          {sugerencias.map((categoria, id) => (
            <li key={id}>
              {categoria}
            </li>
          ))}
        </ul>
      )
      }
    </div>

  );
}

export default FiltroBusqueda;