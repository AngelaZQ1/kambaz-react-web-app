import { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as quizzesClient from "../client";
import EditQuestion from "../EditQuestion";
import PreviewQuestion from "../PreviewQuestion";
import { setQuizzes } from "../reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details"
  );
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [quiz, setQuiz] = useState(quizzes.find((quiz) => quiz._id === qid));

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleCancel = () => {
    window.location.href = `#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`;
  };

  const handleSave = async () => {
    await quizzesClient.updateQuiz(quiz);
    const updatedQuizzes = quizzes.map((q) => (q._id === quiz._id ? quiz : q));
    dispatch(setQuizzes(updatedQuizzes));
    window.location.href = `#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`;
  };

  const handleSaveAndPublish = async () => {
    await quizzesClient.updateQuiz({ ...quiz, published: true });
    const updatedQuizzes = quizzes.map((q) =>
      q._id === quiz._id ? { ...quiz, published: true } : q
    );
    dispatch(setQuizzes(updatedQuizzes));
    window.location.href = `#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`;
  };

  const handleDelete = async (questionId: number) => {
    const updatedQuiz = {
      ...quiz,
      questions: quiz.questions.filter((q) => q._id !== questionId),
    };
    await quizzesClient.deleteQuestionFromQuiz(qid, questionId);
    setQuiz(updatedQuiz);
    const updatedQuizzes = quizzes.map((q) =>
      q._id === quiz._id ? updatedQuiz : q
    );
    dispatch(setQuizzes(updatedQuizzes));
  };

  return (
    <Tabs
      id="quiz-editor-tabs"
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k as "details" | "questions")}
      className="mb-3"
    >
      <Tab eventKey="details" title="Details">
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              defaultValue={quiz?.title || ""}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quiz Instructions:</label>
            <textarea
              className="form-control"
              rows={4}
              defaultValue={quiz?.description || ""}
              onChange={(e) =>
                setQuiz({ ...quiz, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Quiz Type</label>
            <select
              className="form-select"
              defaultValue={quiz?.type || "Graded Quiz"}
              onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Points</label>
            <input
              type="text"
              className="form-control"
              value={quiz?.points || ""}
              onChange={(e) =>
                setQuiz({ ...quiz, points: Number(e.target.value) })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Assignment Group</label>
            <select
              className="form-select"
              defaultValue={quiz?.assignmentGroup || "Quizzes"}
              onChange={(e) =>
                setQuiz({ ...quiz, assignmentGroup: e.target.value })
              }
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Shuffle Answers</label>
            <select
              className="form-select"
              defaultValue={quiz?.shuffleAnswers ? "Yes" : "No"}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  shuffleAnswers: e.target.value === "Yes",
                })
              }
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Time Limit</label>
            <input
              type="text"
              className="form-control"
              defaultValue={quiz?.timeLimit || "20 Minutes"}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Multiple Attempts</label>
            <select
              className="form-select"
              defaultValue={quiz?.multipleAttempts ? "Yes" : "No"}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  multipleAttempts: e.target.value === "Yes",
                })
              }
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Show Correct Answers</label>
            <input
              type="text"
              className="form-control"
              defaultValue={quiz?.showCorrectAnswers || ""}
              onChange={(e) =>
                setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Access Code</label>
            <input
              type="text"
              className="form-control"
              defaultValue={quiz?.accessCode || ""}
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">One Question at a Time</label>
            <select
              className="form-select"
              defaultValue={quiz?.oneQuestionAtATime ? "Yes" : "No"}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  oneQuestionAtATime: e.target.value === "Yes",
                })
              }
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Webcam Required</label>
            <select
              className="form-select"
              defaultValue={quiz?.webcamRequired ? "Yes" : "No"}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  webcamRequired: e.target.value === "Yes",
                })
              }
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Lock Questions After Answering</label>
            <select
              className="form-select"
              defaultValue={quiz?.lockQuestionsAfterAnswering ? "Yes" : "No"}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  lockQuestionsAfterAnswering: e.target.value === "Yes",
                })
              }
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              defaultValue={quiz?.dueDate || ""}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Available Date</label>
            <input
              type="date"
              className="form-control"
              defaultValue={quiz?.availableDate || ""}
              onChange={(e) =>
                setQuiz({ ...quiz, availableDate: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Until Date</label>
            <input
              type="date"
              className="form-control"
              defaultValue={quiz?.untilDate || ""}
              onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
            />
          </div>
        </form>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" className="me-2" onClick={handleSave}>
            Save
          </Button>
          <Button variant="success" onClick={handleSaveAndPublish}>
            Save and Publish
          </Button>
        </div>
      </Tab>

      {/* QUESTIONS TAB */}
      <Tab eventKey="questions" title="Questions" className="w-50">
        <div className="mb-3">Total Points: {quiz.points}</div>
        {quiz.questions.map((question, index) =>
          index === editIndex ? (
            <EditQuestion
              question={question}
              setQuiz={setQuiz}
              quiz={quiz}
              index={index}
              setEditIndex={setEditIndex}
            />
          ) : (
            <PreviewQuestion
              question={question}
              index={index}
              setEditIndex={setEditIndex}
              handleDelete={handleDelete}
            />
          )
        )}
        <div className="d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={() =>
              setQuiz({
                ...quiz,
                questions: [
                  ...quiz.questions,
                  { question: "", answers: [{ answer: "" }] },
                ],
              })
            }
          >
            Add Question
          </Button>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Tab>
    </Tabs>
  );
}
