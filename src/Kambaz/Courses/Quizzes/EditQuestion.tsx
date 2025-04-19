/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Button } from "react-bootstrap";
import Editor from "react-simple-wysiwyg";

export default function EditQuestion({
  originalQuestion,
  updateQuestion,
  index,
  setEditIndex,
}: {
  originalQuestion: any;
  index: number | null;
  updateQuestion: (question: any) => void;
  setEditIndex: (index: number) => void;
}) {
  const [question, setQuestion] = useState(originalQuestion);

  const handleCancel = () => {
    setQuestion(originalQuestion);
    setEditIndex(-1);
  };

  return (
    <div key={index} className="mb-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex  gap-2">
          <input
            type="text"
            className="form-control"
            value={question.title}
            onChange={(e) =>
              setQuestion({ ...question, title: e.target.value })
            }
          />
          <select
            value={question.type}
            className="form-control"
            onChange={(e) => setQuestion({ ...question, type: e.target.value })}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
          </select>
        </div>
        <div className="d-flex  w-25">
          <p>Pts:</p>
          <input
            type="text"
            className="form-control"
            value={question.points}
            onChange={(e) =>
              setQuestion({ ...question, points: e.target.value })
            }
          />
        </div>
      </div>
      <label className="mt-4">Question</label>
      <Editor
        value={question.question}
        onChange={(e) => setQuestion({ ...question, question: e.target.value })}
      />

      <div className="mt-2">
        {question.choices.map(
          (
            choice: {
              isCorrect: any;
              text: string;
            },
            i: number
          ) => (
            <div key={i} className="mb-2 d-flex gap-2 align-items-center">
              <input
                type="radio"
                name={`correct-answer-${index}`}
                className="form-check-input flex-shrink-0"
                checked={choice.isCorrect || false}
                onChange={() =>
                  setQuestion({
                    ...question,
                    choices: question.choices.map((choice: any, j: any) =>
                      j === i
                        ? { ...choice, isCorrect: true }
                        : { ...choice, isCorrect: false }
                    ),
                  })
                }
              />
              <input
                type="text"
                className="form-control"
                value={choice.text}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    choices: question.choices.map((choice: any, j: any) =>
                      j === i ? { ...choice, text: e.target.value } : choice
                    ),
                  })
                }
              />
              <Button
                variant="danger"
                onClick={() =>
                  setQuestion({
                    ...question,
                    choices: question.choices.filter(
                      (_: any, j: any) => j !== i
                    ),
                  })
                }
              >
                Remove
              </Button>
            </div>
          )
        )}
        <Button
          variant="primary"
          onClick={() =>
            setQuestion({
              ...question,
              choices: [...question.choices, { text: "" }],
            })
          }
        >
          Add Choice
        </Button>
      </div>

      <div className="mt-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="btn-danger"
          onClick={() => {
            updateQuestion(question);
            setEditIndex(-1);
          }}
        >
          Update Question
        </Button>
      </div>
    </div>
  );
}
