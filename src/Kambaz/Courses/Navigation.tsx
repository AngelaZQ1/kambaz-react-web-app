import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
export default function CourseNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const pathName = useLocation().pathname;
  const { cid } = useParams();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <div key={link}>
          <Link
            to={`/Kambaz/Courses/${cid}/${link}`}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border border-0
              ${pathName.includes(link) && "active"}`}
          >
            {link}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}
