import TarjetaPelicula from "../tarjetaPelicula/TarjetaPelicula";
import { Col, Row } from "react-bootstrap";

export default function Sugerencias({ sugerencias }) {
  return (
    <div className="mt-4">
      <h5 className="text-white mb-4 d-flex align-items-center">
        <span
          style={{
            width: "4px",
            height: "20px",
            backgroundColor: "#192434",
            marginRight: "10px",
            display: "inline-block",
          }}
        ></span>
        Te puede interesar
      </h5>
      <Row g={3}>
        {sugerencias.map((pelicula) => (
          <Col xs={6} key={pelicula.id} className="mb-3" md={6}>
            <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
