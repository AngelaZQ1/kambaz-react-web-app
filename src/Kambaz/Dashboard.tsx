import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img variant="top" src="/images/reactjs.jpg" width={200} />
                <Card.Body>
                  <Card.Title> CS1234 React JS </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Full Stack software developer
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1235/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img variant="top" src="/images/nodejs.jpg" width={200} />
                <Card.Body>
                  <Card.Title> CS1235 Node JS </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Node.js
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1236/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img variant="top" src="/images/angular.jpg" width={200} />
                <Card.Body>
                  <Card.Title> CS1236 Angular </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Frontend development with Angular
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1237/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img variant="top" src="/images/vuejs.png" width={200} />
                <Card.Body>
                  <Card.Title> CS1237 Vue JS </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Frontend development with Vue.js
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1238/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img variant="top" src="/images/python.png" width={200} />
                <Card.Body>
                  <Card.Title> CS1238 Python </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Python
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1239/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img variant="top" src="/images/java.png" width={200} />
                <Card.Body>
                  <Card.Title> CS1239 Java </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Java
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1240/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img variant="top" src="/images/csharp.png" width={200} />
                <Card.Body>
                  <Card.Title> CS1240 C# </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    C#{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
