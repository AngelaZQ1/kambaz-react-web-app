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
  const [feedback, setFeedback] = useState<any[]>([]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    const feedbackData = quiz.questions.map((question: any) => {
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
        isCorrect = correctChoice?.text === selectedAnswer;
      }

      if (isCorrect) {
        calculatedScore += question.points;
      }

      return {
        question: question.title,
        isCorrect,
        correctAnswer:
          question.type === "FILL_IN_THE_BLANK"
            ? question.choices.map((choice: any) => choice.text).join(", ")
            : question.choices.find((choice: any) => choice.isCorrect)?.text,
        selectedAnswer: selectedAnswer || "No answer provided",
      };
    });

    setScore(calculatedScore);
    setFeedback(feedbackData);
  };

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div className="quiz-preview">
      <h2 className="mb-4">{quiz.title}</h2>
      {quiz.questions.map((question: any) => (
        <div key={question._id} className="mb-4">
          <h5>{question.title}</h5>
          <p>{question.question}</p>
          {question.type === "FILL_IN_THE_BLANK" ? (
            <input
              type="text"
              className="form-control"
              value={answers[question._id] || ""}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              placeholder="Type your answer here"
            />
          ) : (
            question.choices.map((choice: any) => (
              <div key={choice._id} className="form-check">
                <input
                  type="radio"
                  id={`${question._id}-${choice._id}`}
                  name={question._id}
                  className="form-check-input"
                  value={choice.text} // Store the actual answer text
                  onChange={() => handleAnswerChange(question._id, choice.text)}
                  checked={answers[question._id] === choice.text}
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
      ))}
      <Button variant="primary" onClick={handleSubmit} className="mt-3">
        Submit Quiz
      </Button>

      {score !== null && (
        <div className="mt-5">
          <hr />
          <h3>
            Your Score: {score} / {quiz.points}
          </h3>
          <h4>Feedback:</h4>
          <ul>
            {feedback.map((item, index) => (
              <li key={index}>
                <strong>{item.question}</strong>:{" "}
                {item.isCorrect ? "Correct" : "Incorrect"} <br />
                <strong>Your Answer:</strong> {item.selectedAnswer} <br />
                <strong>Correct Answer:</strong> {item.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
