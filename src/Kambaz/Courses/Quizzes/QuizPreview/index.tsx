/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import * as quizzesClient from "../client";

export default function QuizPreview() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  const [answers, setAnswers] = useState<
    { question: string; isCorrect: boolean; selectedChoiceId: string }[]
  >([]);
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId: string, selectedChoiceId: string) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question === questionId
      );

      if (existingAnswerIndex !== -1) {
        // Update the existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          selectedChoiceId,
        };
        return updatedAnswers;
      } else {
        // Add a new answer
        return [
          ...prevAnswers,
          { question: questionId, isCorrect: false, selectedChoiceId },
        ];
      }
    });
  };

  const fetchQuizData = async () => {
    const canAttemptQuiz = await quizzesClient
      .canUserAttemptQuiz(currentUser._id, qid!)
      .then((response) => {
        return response.canAttempt;
      });

    if (!canAttemptQuiz) {
      const latestAttempt = await quizzesClient.getLatestQuizAttemptForUser(
        currentUser._id,
        quiz._id
      );

      if (latestAttempt && latestAttempt.answers) {
        const formattedAnswers = latestAttempt.answers.map((answer: any) => ({
          question: answer.question,
          isCorrect: answer.isCorrect,
          selectedChoiceId: answer.selectedChoiceId,
        }));

        setAnswers(formattedAnswers);
        setScore(latestAttempt.score);
        setSubmitted(true);
      }
    }
  };

  useEffect(() => {
    if (currentUser.role === "STUDENT" && quiz) {
      fetchQuizData();
    }
  }, [currentUser, quiz]);

  const handleSubmit = () => {
    let calculatedScore = 0;
    const updatedAnswers = quiz.questions.map((question: any) => {
      const selectedChoiceId =
        answers.find((answer) => answer.question === question._id)
          ?.selectedChoiceId || "";
      let isCorrect = false;

      if (question.type === "FILL_IN_THE_BLANK") {
        // Check if the typed answer matches any of the choices
        const selectedAnswerText = question.choices.find(
          (choice: any) => choice._id === selectedChoiceId
        )?.text;
        isCorrect = question.choices.some(
          (choice: any) =>
            choice.isCorrect &&
            choice.text.trim().toLowerCase() ===
              selectedAnswerText?.trim().toLowerCase()
        );
      } else {
        // For other question types, check if the selected choice is correct
        const correctChoice = question.choices.find(
          (choice: any) => choice.isCorrect
        );
        isCorrect = correctChoice?._id === selectedChoiceId;
      }

      if (isCorrect) {
        calculatedScore += question.points;
      }

      return { question: question._id, isCorrect, selectedChoiceId };
    });

    // Faculty can submit the quiz without saving answers, and can submit multiple times
    // Students' answers are saved
    if (currentUser.role === "FACULTY") {
      setAnswers(updatedAnswers);
      setScore(calculatedScore);
      setSubmitted(true);
    } else if (currentUser.role === "STUDENT") {
      quizzesClient
        .submitQuizAttempt(
          qid!,
          currentUser._id,
          calculatedScore,
          updatedAnswers
        )
        .then(() => {
          setAnswers(updatedAnswers);
          setScore(calculatedScore);
          setSubmitted(true);
        });
    }
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
        const answer = answers.find((a) => a.question === question._id);
        const isCorrect = submitted ? answer?.isCorrect : null;

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
                className="form-control"
                onChange={(e) => {
                  const matchingChoice = question.choices.find(
                    (choice: any) =>
                      choice.text.trim().toLowerCase() ===
                      e.target.value.trim().toLowerCase()
                  );
                  handleAnswerChange(question._id, matchingChoice?._id || "");
                }}
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
                    className={"form-check-input"}
                    value={choice._id}
                    onChange={() =>
                      handleAnswerChange(question._id, choice._id)
                    }
                    checked={answer?.selectedChoiceId === choice._id}
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
