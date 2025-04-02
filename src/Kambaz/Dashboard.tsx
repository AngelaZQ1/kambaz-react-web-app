/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as userClient from "./Account/client";
import * as enrollmentsClient from "./client";
import * as courseClient from "./Courses/client";
import { setCourses } from "./Courses/reducer";
import { enrollUser, setEnrollments, unenrollUser } from "./reducer";

export default function Dashboard({
  course,
  setCourse,
}: {
  course: any;
  setCourse: (course: any) => void;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(
      setCourses(
        courses.filter((course: { _id: string }) => course._id !== courseId)
      )
    );
  };
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c: { _id: string }) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
  };
  const enrollUserInCourse = async (courseId: string) => {
    await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
    dispatch(
      enrollUser({
        user: currentUser._id,
        course: courseId,
      })
    );
  };
  const unenrollUserFromCourse = async (courseId: string) => {
    await enrollmentsClient.unenrollUser(currentUser._id, courseId);
    dispatch(
      unenrollUser({
        userId: currentUser._id,
        courseId: courseId,
      })
    );
  };
  const fetchCourses = async () => {
    const courses = await courseClient.fetchAllCourses();
    dispatch(setCourses(courses));
  };
  const fetchEnrollments = async () => {
    const enrollments = await enrollmentsClient.getEnrollments();
    dispatch(setEnrollments(enrollments));
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);

  let coursesToShow = courses;
  if (currentUser.role === "STUDENT" && !showAllCourses) {
    coursesToShow = courses.filter((course: { _id: any }) =>
      enrollments.some(
        (e: { user: any; course: any }) =>
          e.user === currentUser._id && e.course === course._id
      )
    );
  }
  console.log("courses", courses);
  console.log("coursesToShow", coursesToShow);
  console.log("enrollments", enrollments);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}
      {currentUser.role === "STUDENT" && (
        <div className="d-flex justify-content-between">
          <h2 id="wd-dashboard-published">
            Published Courses ({courses.length})
          </h2>
          <button
            className="btn bg-primary text-white"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            Enrollments
          </button>
        </div>
      )}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {coursesToShow.map(
            (course: { _id: string; name: string; description: string }) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </Card.Text>
                      <Button variant="primary" className="me-2">
                        Go
                      </Button>
                      {showAllCourses ? (
                        enrollments.some(
                          (e: { user: any; course: any }) =>
                            e.user === currentUser._id &&
                            e.course === course._id
                        ) ? (
                          <Button
                            className="bg-danger border-0"
                            onClick={(event) => {
                              event.preventDefault();
                              unenrollUserFromCourse(course._id);
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            className="bg-success border-0"
                            onClick={(event) => {
                              event.preventDefault();
                              enrollUserInCourse(course._id);
                            }}
                          >
                            Enroll
                          </Button>
                        )
                      ) : null}

                      {currentUser.role === "FACULTY" && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            )
          )}
        </Row>
      </div>
    </div>
  );
}
