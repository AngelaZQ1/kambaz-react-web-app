import { useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { BiPlus, BiSearch, BiSolidDownArrow } from "react-icons/bi";
import { BsGripVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    null | string
  >(null);

  const handleDelete = () => {
    dispatch(deleteAssignment(selectedAssignmentId));
    setShowModal(false);
  };

  return (
    <div id="wd-assignments">
      <div
        id="wd-assignments"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="input-group w-auto">
          <span className="input-group-text">
            <BiSearch />
          </span>
          <input
            placeholder="Search..."
            id="wd-search-assignment"
            className="form-control"
          />
        </div>
        {currentUser.role === "FACULTY" && (
          <div>
            <Button
              variant="secondary"
              id="wd-add-assignment-group"
              className="me-1"
            >
              <BiPlus />
              Group
            </Button>
            <Button
              variant="danger"
              id="wd-add-assignment"
              onClick={() =>
                (window.location.href = `#/Kambaz/Courses/${cid}/Assignments/new`)
              }
            >
              <BiPlus />
              Assignment
            </Button>
          </div>
        )}
      </div>

      <div className="wd-title p-3 ps-2 bg-secondary mt-3">
        <h3 id="wd-assignments-title">
          <BsGripVertical className="fs-3" />
          <BiSolidDownArrow className="m-2 fs-6" />
          ASSIGNMENTS
          <span className="float-end">
            <span className="fs-5">40% of Total</span>
            <BiPlus className="m-2" />
            <IoEllipsisVertical className="fs-4" />
          </span>
        </h3>
      </div>
      <ListGroup className="rounded-0" id="wd-assignment-list">
        {assignments
          .filter((a) => a.course === cid)
          .map((assignment) => (
            <ListGroup.Item className="wd-assignment-list-item p-0 fs-5 border-gray d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <BsGripVertical className="fs-3" />
                <MdEditDocument color="green" className="fs-3 mx-3" />
                <div className="mt-3">
                  <a
                    href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link fs-4 fw-bold text-decoration-none wd-fg-color-black"
                  >
                    {assignment.title}
                  </a>
                  <p>
                    <span className="wd-fg-color-red">Multiple Modules </span>|
                    <b> Not available until</b> May 6 at 12:00am | <b>Due</b>{" "}
                    May 13 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <span className="flex-shrink-0">
                <LessonControlButtons />
                <FaTrash
                  className="text-danger me-2 mb-1"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedAssignmentId(assignment._id);
                  }}
                />
              </span>
            </ListGroup.Item>
          ))}
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>Confirm Delete</Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setSelectedAssignmentId(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
