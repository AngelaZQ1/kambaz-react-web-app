/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as assignmentsClient from "./client";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const dispatch = useDispatch();
  const [assignment, setAssignment] = useState(
    assignments.find(
      (assignment: { _id: string | undefined }) => assignment._id === aid
    )
  );

  const handleSave = async () => {
    if (assignment.course) {
      await assignmentsClient.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    } else {
      const newAssignment = await assignmentsClient.createAssignment(
        assignment,
        cid as string
      );
      dispatch(addAssignment(newAssignment));
    }
    window.history.back();
  };

  return (
    <>
      <div
        id="wd-assignments-editor"
        className="d-flex flex-column align-items-end w-75"
      >
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control
          placeholder={assignment?.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <textarea
          id="wd-description"
          className="mt-3"
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        >
          {assignment?.description}
        </textarea>
        <br />
        <div className="w-75">
          <Form.Group
            controlId="wd-points"
            className="mt-3 d-flex justify-content-end gap-2 align-items-center"
          >
            <Form.Label className="">Points</Form.Label>
            <Form.Control
              type="number"
              className="w-100"
              value={assignment?.points}
              onChange={(e) =>
                setAssignment({ ...assignment, points: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group
            controlId="wd-group"
            className="mt-3 d-flex justify-content-end gap-2 align-items-center"
          >
            <Form.Label className="me-2">Assignment Group</Form.Label>
            <Form.Control as="select" className="w-100">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            controlId="wd-display-grade-as"
            className="mt-3 d-flex justify-content-end gap-2 align-items-center"
          >
            <Form.Label className="me-2">Display Grade as</Form.Label>
            <Form.Control as="select" className="w-100">
              <option value="Percentage">Percentage</option>
              <option value="Letter">Letter</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            controlId="wd-submission-type"
            className="mt-3 d-flex justify-content-end gap-2 align-items-center"
          >
            <Form.Label className="me-2">Submission Type</Form.Label>
            <Form.Control as="select" className="w-100">
              <option value="Online">Online</option>
              <option value="InPerson">In Person</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3 d-flex flex-column gap-2 align-items-start">
            <Form.Label className="me-2">
              <b>Online Entry Options</b>
            </Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
              />
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
              />
              <Form.Check
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
              />
              <Form.Check
                type="checkbox"
                id="wd-file-upload"
                label="File Uploads"
              />
            </div>
          </Form.Group>
          <Form.Group
            controlId="wd-assign-to"
            className="mt-3 d-flex justify-content-end gap-2 align-items-center"
          >
            <Form.Label className="me-2">
              <b>Assign to</b>
            </Form.Label>
            <Form.Control type="text" className="w-100" />
          </Form.Group>
          <Form.Group
            controlId="wd-due-date"
            className="mt-3 d-flex justify-content-end gap-2 align-items-center"
          >
            <Form.Label className="me-2">
              <b>Due</b>
            </Form.Label>
            <Form.Control
              type="date"
              className="w-100"
              value={assignment?.due_date}
              onChange={(e) =>
                setAssignment({ ...assignment, due_date: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mt-3 d-flex justify-content-end gap-2 align-items-center">
            <div className="me-3">
              <Form.Label className="me-2">
                <b>Available From</b>
              </Form.Label>
              <Form.Control
                type="date"
                value={assignment?.available_date}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    available_from: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Form.Label className="me-2">
                <b>Until</b>
              </Form.Label>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    available_to: e.target.value,
                  })
                }
              />
            </div>
          </Form.Group>
        </div>

        <br />
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            className="btn-secondary me-2"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
