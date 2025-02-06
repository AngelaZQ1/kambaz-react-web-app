import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <Form.Control type="text" placeholder="username" />
      <Form.Control type="text" placeholder="password" className="my-2" />
      <Button variant="primary" className="w-100">
        <Link
          to="/Kambaz/Dashboard"
          id="wd-signin-btn"
          className="text-decoration-none text-white"
        >
          Sign in
        </Link>
      </Button>
      <br />
      <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
