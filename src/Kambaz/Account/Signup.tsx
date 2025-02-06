import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <Form.Control type="text" placeholder="username" className="my-2" />
      <Form.Control type="password" placeholder="password" className="my-2" />
      <Form.Control
        type="password"
        placeholder="verify password"
        className="my-2"
      />
      <Button variant="primary" className="w-100 my-2">
        <Link
          to="/Kambaz/Account/Profile"
          id="wd-signup-btn"
          className="text-decoration-none text-white"
        >
          Sign up
        </Link>
      </Button>
      <br />
      <Link to="/Kambaz/Account/Signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
