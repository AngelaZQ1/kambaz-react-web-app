import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((quiz) => quiz._id === qid);

  return (
    <div>
      {currentUser.role === "FACULTY" && (
        <div className="mb-5">
          <Button
            className="me-2"
            onClick={() => alert("Previewing the quiz...")}
          >
            Preview
          </Button>
          <Button
            onClick={() =>
              (window.location.href = `#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/editor`)
            }
          >
            Edit
          </Button>
        </div>
      )}
      <h2>{quiz.title}</h2>
      <p>
        <strong>Quiz Type:</strong> {quiz.type}
      </p>
      <p>
        <strong>Points:</strong> {quiz.points}
      </p>
      <p>
        <strong>Assignment Group:</strong> {quiz.assignmentGroup}
      </p>
      <p>
        <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}
      </p>
      <p>
        <strong>Time Limit:</strong> {quiz.timeLimit} Minutes
      </p>
      <p>
        <strong>Multiple Attempts:</strong>{" "}
        {quiz.allowMultipleAttempts ? "Yes" : "No"}
      </p>
      <p>
        <strong>How Many Attempts:</strong> {quiz.numAllowedAttempts}
      </p>
      <p>
        <strong>Show Correct Answers:</strong>{" "}
        {quiz.showCorrectAnswers || "Not specified"}
      </p>
      <p>
        <strong>Access Code:</strong> {quiz.accessCode || "None"}
      </p>
      <p>
        <strong>One Question at a Time:</strong>{" "}
        {quiz.oneQuestionAtATime ? "Yes" : "No"}
      </p>
      <p>
        <strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}
      </p>
      <p>
        <strong>Lock Questions After Answering:</strong>{" "}
        {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
      </p>
      <p>
        <strong>Due:</strong>{" "}
        {quiz.dueDate
          ? new Date(quiz.dueDate).toLocaleString()
          : "Not specified"}
      </p>
      <p>
        <strong>Available from:</strong>{" "}
        {quiz.availableDate
          ? new Date(quiz.availableDate).toLocaleString()
          : "Not specified"}
      </p>
      <p>
        <strong>Until:</strong>{" "}
        {quiz.untilDate
          ? new Date(quiz.untilDate).toLocaleString()
          : "Not specified"}
      </p>
      {currentUser.role === "STUDENT" && (
        <Button
          className="mt-5"
          variant="danger"
          onClick={() => alert("Starting the quiz...")}
        >
          Start Quiz
        </Button>
      )}
    </div>
  );
}
