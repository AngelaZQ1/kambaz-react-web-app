export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>{" "}
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>{" "}
              <option value="PROJECT">PROJECT</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="Percentage">Percentage</option>{" "}
              <option value="Letter">Letter</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="Online">Online</option>{" "}
              <option value="InPerson">In Person</option>
            </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td align="right" valign="top">
            <label>Online Entry Options</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <input id="wd-text-entry" type="checkbox"></input>
          <label htmlFor="wd-text-entry">Text Entry</label>
        </tr>
        <tr>
          <td></td>
          <input id="wd-website-url" type="checkbox"></input>
          <label htmlFor="wd-website-url">Website URL</label>
        </tr>
        <tr>
          <td></td>
          <input id="wd-media-recordings" type="checkbox"></input>
          <label htmlFor="wd-media-recordings">Media Recordings</label>
        </tr>
        <tr>
          <td></td>
          <input id="wd-file-upload" type="checkbox"></input>
          <label htmlFor="wd-file-upload">File Uploads</label>
        </tr>
        <tr>
          <td></td>
          <td align="left">
            <label htmlFor="wd-assign-to">Assign to</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input id="wd-assign-to" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input type="date" id="wd-due-date" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available From</label>
            <input type="date" id="wd-available-from" />
          </td>
          <td align="right" valign="top">
            <label htmlFor="wd-available-to">Until</label>
            <input type="date" id="wd-available-to" />
          </td>
        </tr>
        <tr>
          <button>Cancel</button>
          <button>Save</button>
        </tr>
      </table>
    </div>
  );
}
