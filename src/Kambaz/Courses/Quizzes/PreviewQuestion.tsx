/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";

export default function PreviewQuestion({
  question,
  index,
  setEditIndex,
  handleDelete,
}: {
  question: any;
  index: number | null;
  setEditIndex: (index: number) => void;
  handleDelete: (question: any) => void;
}) {
  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  return (
    <div key={index} className="mb-3 border border-dark-subtle p-3">
      <div className="d-flex justify-content-between">
        <h3>{question.title}</h3>
        <div>
          <Button
            variant="secondary"
            className="me-2"
            size="sm"
            onClick={() => {
              setEditIndex(index!);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(question)}
          >
            Delete
          </Button>
        </div>
      </div>
      <p>{stripHtmlTags(question.question)}</p>
      <div className="mt-2">
        {question.choices.map(
          (
            choice: {
              text: string;
            },
            i: number
          ) => (
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
          )
        )}
      </div>
    </div>
  );
}
