export default function Comentario(props) {
  const comentario = props.comentario;
  return (
    <div key={comentario.id} className="border-bottom border-secondary py-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong className="text-info">@{comentario.usuario}</strong>
        <div>
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`bi ${i < comentario.puntuacion ? "bi-star-fill text-warning" : "bi-star text-secondary"} small`}
            />
          ))}
        </div>
      </div>
      <p className="text-white-50 mb-0">{comentario.descripcion}</p>
    </div>
  );
}
