/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function QuizPreview() {
  const { qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;

    quiz.questions.forEach((question: any) => {
      const selectedAnswer = answers[question._id];
      let isCorrect = false;

      if (question.type === "FILL_IN_THE_BLANK") {
        // Check if the typed answer matches any of the choices
        isCorrect = question.choices.some(
          (choice: any) =>
            choice.isCorrect &&
            choice.text.trim().toLowerCase() ===
              selectedAnswer?.trim().toLowerCase()
        );
      } else {
        // For other question types, check if the selected choice is correct
        const correctChoice = question.choices.find(
          (choice: any) => choice.isCorrect
        );
        isCorrect = correctChoice?._id === selectedAnswer;
      }

      if (isCorrect) {
        calculatedScore += question.points;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div>
      <h2 className="mb-4">{quiz.title}</h2>

      {submitted && (
        <div className="alert alert-info">
          <h3>
            Your Score: {score} / {quiz.points}
          </h3>
        </div>
      )}

      {quiz.questions.map((question: any) => {
        const isCorrect = submitted
          ? question.type === "FILL_IN_THE_BLANK"
            ? question.choices.some(
                (choice: any) =>
                  choice.isCorrect &&
                  choice.text.trim().toLowerCase() ===
                    answers[question._id]?.trim().toLowerCase()
              )
            : question.choices.find(
                (choice: any) =>
                  choice.isCorrect && choice._id === answers[question._id]
              )
          : null;

        return (
          <div
            key={question._id}
            className={`mb-4 p-3 border border-2 ${
              submitted
                ? isCorrect
                  ? "border-success bg-light"
                  : "border-danger bg-light"
                : "border-dark"
            }`}
          >
            <h5>{question.title}</h5>
            <p>{question.question}</p>
            {question.type === "FILL_IN_THE_BLANK" ? (
              <input
                type="text"
                className={`form-control`}
                value={answers[question._id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question._id, e.target.value)
                }
                placeholder="Type your answer here"
                disabled={submitted}
              />
            ) : (
              question.choices.map((choice: any) => (
                <div key={choice._id} className="form-check">
                  <input
                    type="radio"
                    id={`${question._id}-${choice._id}`}
                    name={question._id}
                    className={`form-check-input`}
                    value={choice._id}
                    onChange={() =>
                      handleAnswerChange(question._id, choice._id)
                    }
                    checked={answers[question._id] === choice._id}
                    disabled={submitted}
                  />
                  <label
                    htmlFor={`${question._id}-${choice._id}`}
                    className="form-check-label"
                  >
                    {choice.text}
                  </label>
                </div>
              ))
            )}
          </div>
        );
      })}

      {!submitted && (
        <Button variant="primary" onClick={handleSubmit} className="mt-3">
          Submit Quiz
        </Button>
      )}
    </div>
  );
}
