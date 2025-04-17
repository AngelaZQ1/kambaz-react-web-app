import { useEffect } from "react";
import { Button, Dropdown, ListGroup } from "react-bootstrap";
import { BiPlus, BiSolidDownArrow } from "react-icons/bi";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as quizzesClient from "./client";
import { setQuizzes } from "./reducer";

export default function Quizzes() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  const fetchQuizzes = async () => {
    const quizzes = await quizzesClient.getAllQuizzes(cid!);
    const currentDate = new Date();

    const quizzesWithAvailability = quizzes.map((quiz) => {
      const availableDate = new Date(quiz.availableDate);
      const availableUntilDate = new Date(quiz.untilDate);
      let availability = "Closed";

      if (currentDate < availableDate) {
        availability = `Not available until ${availableDate.toLocaleString()}`;
      } else if (
        currentDate >= availableDate &&
        currentDate <= availableUntilDate
      ) {
        availability = "Available";
      }
      return { ...quiz, availability };
    });
    dispatch(setQuizzes(quizzesWithAvailability));
  };

  const handleDelete = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    fetchQuizzes();
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-end">
        {isFaculty && (
          <Button
            variant="danger"
            onClick={() =>
              (window.location.href = `#/Kambaz/Courses/${cid}/Quizzes/new`)
            }
          >
            <BiPlus />
            Quiz
          </Button>
        )}
      </div>

      <div className="wd-title p-3 ps-2 bg-secondary mt-3">
        <h3 id="wd-assignments-title">
          <BsGripVertical className="fs-3" />
          <BiSolidDownArrow className="m-2 fs-6" />
          Quizzes
        </h3>
      </div>
      <ListGroup className="rounded-0">
        {quizzes.map((quiz) => (
          <ListGroup.Item className="wd-assignment-list-item p-0 fs-5 border-gray d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="fs-3" />
              <MdEditDocument color="green" className="fs-3 mx-3" />
              <div className="mt-3">
                <a
                  onClick={() =>
                    (window.location.href = `#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`)
                  }
                  className="wd-assignment-link fs-4 fw-bold text-decoration-none wd-fg-color-black"
                >
                  {quiz.title}
                </a>
                <p>
                  {`${quiz.availability} | Due ${new Date(
                    quiz.dueDate
                  ).toLocaleString()} | ${quiz.points} pts | ${
                    quiz.questions.length
                  } questions`}
                </p>
              </div>
            </div>
            {isFaculty && (
              <Dropdown className="float-end me-2">
                <Dropdown.Toggle
                  variant="ghost"
                  size="lg"
                  id="wd-quiz-actions-btn"
                >
                  <IoEllipsisVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    id="wd-edit-quiz"
                    onClick={() => console.log(`Edit quiz ${quiz.id}`)}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="wd-delete-quiz"
                    onClick={() => handleDelete(quiz._id)}
                  >
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="wd-publish-quiz"
                    onClick={() => console.log(`Publish quiz ${quiz._id}`)}
                  >
                    Publish
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
