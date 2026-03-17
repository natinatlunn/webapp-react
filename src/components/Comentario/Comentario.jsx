export default function Comentario(props) {
  const comentario = props.comentario;
  return (
    <div key={comentario.id} className="border-bottom border-secondary py-3">
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1 pe-3">
          <strong className="text-info d-block mb-1">
            @{comentario.usuario}
          </strong>
          <p className="text-light mb-0">{comentario.descripcion}</p>
        </div>

        <div className="d-flex flex-column align-items-end justify-content-between flex-shrink-0 text-nowrap">
          <div className="mb-1">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi ${i < comentario.puntuacion ? "bi-star-fill text-warning" : "bi-star text-secondary"} small`}
              />
            ))}
          </div>
          <small className="text-white-50" style={{ fontSize: "0.75rem" }}>
            <em>{comentario.fecha}</em>
          </small>
        </div>
      </div>
    </div>
  );
}
