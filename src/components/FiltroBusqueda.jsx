import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FiltroBusqueda(props) {
  return (
    <Form className="zona-buscador" onSubmit={props.onEnviar}>
      <Form.Control
        type="text"
        placeholder="Filtrar por género..."
        value={props.valor}
        onChange={props.onCambio}
      />
      <Button variant="primary" type="submit" aria-label="Buscar">
        <i className="bi bi-search"></i>
      </Button>
    </Form>
  );
}

export default FiltroBusqueda;