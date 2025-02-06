import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Form.Control
        defaultValue="alice"
        placeholder="alice"
        id="wd-username"
        className="my-2"
      />
      <Form.Control
        defaultValue="123"
        placeholder="password"
        id="wd-password"
        className="my-2"
      />
      <Form.Control
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="my-2"
      />
      <Form.Control
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="my-2"
      />
      <Form.Control
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
        className="my-2"
      />
      <Form.Control
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className="my-2"
      />
      <Form.Select defaultValue="FACULTY" id="wd-role" className="my-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </Form.Select>
      <Button variant="danger" className="w-100 my-2">
        <Link
          to="/Kambaz/Account/Signin"
          id="wd-signout-btn"
          className="text-decoration-none text-white"
        >
          Sign out
        </Link>
      </Button>
    </div>
  );
}
