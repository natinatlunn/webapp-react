import { Card, Stack, Badge } from "react-bootstrap";

export default function Curiosidades({ curiosidad }) {
  return (
    <Card className=" p-4 rounded-4 shadow-lg border-0 mb-4 mt-5 bg-transparent">
      <Card.Body className="p-0">
        <Stack direction="horizontal" className="align-items-center mb-3">
          <div className="icon-box me-3">
            <i className="bi bi-lightbulb-fill text-warning fs-4"></i>
          </div>
          <h5 className="text-white fw-bold mb-0">¿Sabías que...?</h5>
        </Stack>

        <Card.Text
          className="text-white-50 fst-italic lh-lg mb-0"
          style={{ fontSize: "1.05rem" }}
        >
          "{curiosidad}"
        </Card.Text>

        <div className="mt-3 d-flex justify-content-end">
          <Badge
            pill
            bg="secondary"
            className="py-2 px-3 text-uppercase"
            style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
          >
            Dato Curioso
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
}
