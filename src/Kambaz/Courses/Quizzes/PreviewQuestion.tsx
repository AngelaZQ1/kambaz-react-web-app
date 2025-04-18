/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";

export default function PreviewQuestion({
  question,
  index,
  setEditIndex,
  handleDelete,
}: {
  question: any;
  index: number;
  setEditIndex: (index: number) => void;
  handleDelete: (index: number) => void;
}) {
  return (
    <div key={index} className="mb-5 border border-dark-subtle p-3">
      <div className="d-flex justify-content-between">
        <h3>{question.title}</h3>
        <div>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => {
              setEditIndex(index);
            }}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(question._id)}>
            Delete
          </Button>
        </div>
      </div>
      <p>{question.question}</p>
      <div className="mt-2">
        {question.choices.map((choice, i) => (
          <div key={i} className="mb-2">
            <hr />
            {question.type !== "FILL_IN_THE_BLANK" ? (
              <>
                <input
                  type="radio"
                  name="radio-genre"
                  id="choice"
                  className="me-2"
                />
                <label htmlFor="choice">{choice.text}</label>
              </>
            ) : (
              <input
                type="text"
                className="form-control"
                defaultValue={choice.text}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
