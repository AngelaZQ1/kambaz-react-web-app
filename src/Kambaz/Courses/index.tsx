/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Home from "./Home";
import Modules from "./Modules";
import CourseNavigation from "./Navigation";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";

export default function Courses() {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find(
    (course: { _id: string | undefined }) => course._id === cid
  );
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="Quizzes" element={<Quizzes />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
