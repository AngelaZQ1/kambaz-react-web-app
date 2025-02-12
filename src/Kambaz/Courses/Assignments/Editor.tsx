import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignment = db.assignments.find(
    (assignment) => assignment._id === aid
  );

  return (
    <>
      <div
        id="wd-assignments-editor"
        className="d-flex flex-column align-items-end w-75"
      >
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control placeholder={assignment.title} />
        <textarea id="wd-description" className="mt-3">
          The assignment is available online Submit a link to the landing page
          of your Web application running on Netlify. The landing page should
          include the following: - Your full name and section - Links to each of
          the lab assignments - Link to the Kanbas application - Links to all
          relevant source code repositories The Kanbas application should
          include a link to navigate back to the landing page.
        </textarea>
        <br />
        <div className="w-75">
          <Form.Group
            controlId="wd-points"
            className="mt-3 d-flex justify-content-end gap-2 align-items-center"
          >
            <Form.Label className="">Points</Form.Label>
            <Form.Control type="number" className="w-100" />
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
            <Form.Control type="date" className="w-100" />
          </Form.Group>
          <Form.Group className="mt-3 d-flex justify-content-end gap-2 align-items-center">
            <div className="me-3">
              <Form.Label className="me-2">
                <b>Available From</b>
              </Form.Label>
              <Form.Control type="date" />
            </div>
            <div>
              <Form.Label className="me-2">
                <b>Until</b>
              </Form.Label>
              <Form.Control type="date" />
            </div>
          </Form.Group>
        </div>

        <br />
        <hr />
        <div className="d-flex justify-content-end">
          <Button className="btn-secondary me-2">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </div>
    </>
  );
}
