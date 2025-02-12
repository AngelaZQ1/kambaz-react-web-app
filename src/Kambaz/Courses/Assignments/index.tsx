import { Button, ListGroup } from "react-bootstrap";
import { BiPlus, BiSearch, BiSolidDownArrow } from "react-icons/bi";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import * as db from "../../Database";
import { useParams } from "react-router";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(
    (assignment) => assignment.course === cid
  );
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
        <div>
          <Button
            variant="secondary"
            id="wd-add-assignment-group"
            className="me-1"
          >
            <BiPlus />
            Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <BiPlus />
            Assignment
          </Button>
        </div>
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
        {assignments.map((assignment) => (
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
                  <b> Not available until</b> May 6 at 12:00am | <b>Due</b> May
                  13 at 11:59pm | 100 pts
                </p>
              </div>
            </div>
            <span className="flex-shrink-0">
              <LessonControlButtons />
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
