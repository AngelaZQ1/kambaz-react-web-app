/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Button } from "react-bootstrap";
import * as quizzesClient from "./client";

export default function EditQuestion({
  quiz,
  setQuiz,
  question,
  index,
  setEditIndex,
}: {
  question: any;
  index: number;
  quiz: any;
  setQuiz: (quiz: any) => void;
  setEditIndex: (index: number) => void;
}) {
  const [originalQuestion] = useState({ ...question });

  const handleCancel = () => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q, i) =>
        i === index ? originalQuestion : q
      ),
    });
    setEditIndex(-1);
  };

  const handleUpdateQuestion = async () => {
    const updatedQuiz = {
      ...quiz,
      questions: quiz.questions.map((q, i) =>
        i === index ? { ...q, question: question.question } : q
      ),
    };
    setQuiz(updatedQuiz);
    await quizzesClient.updateQuestion(question._id, question);
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
              setQuiz({
                ...quiz,
                questions: quiz.questions.map((q, i) =>
                  i === index ? { ...q, title: e.target.value } : q
                ),
              })
            }
          />
          <select value={question.type} className="form-control">
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
              setQuiz({
                ...quiz,
                questions: quiz.questions.map((q, i) =>
                  i === index ? { ...q, points: e.target.value } : q
                ),
              })
            }
          />
        </div>
      </div>
      <label className="mt-4">Question</label>
      <textarea
        placeholder="Enter question here"
        className="form-control"
        rows={3}
        value={question.question}
        onChange={(e) =>
          setQuiz({
            ...quiz,
            questions: quiz.questions.map((q, i) =>
              i === index ? { ...q, question: e.target.value } : q
            ),
          })
        }
      />

      <div className="mt-2">
        {question.choices.map((choice, i) => (
          <div key={i} className="mb-2 d-flex gap-2 align-items-center">
            <p className="flex-shrink-0">Possible answer:</p>
            <input
              type="text"
              className="form-control"
              value={choice.text}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  questions: quiz.questions.map((q, i) =>
                    i === index
                      ? {
                          ...q,
                          choices: q.choices.map((a, j) =>
                            j === i ? { ...a, text: e.target.value } : a
                          ),
                        }
                      : q
                  ),
                })
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="btn-danger" onClick={handleUpdateQuestion}>
          Update Question
        </Button>
      </div>
    </div>
  );
}
