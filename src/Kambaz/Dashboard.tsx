import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1235/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/nodejs.jpg" width={200} />
            <div>
              <h5> CS1235 Node JS </h5>
              <p className="wd-dashboard-course-title">Node.js</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1236/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/angular.jpg" width={200} />
            <div>
              <h5> CS1236 Angular </h5>
              <p className="wd-dashboard-course-title">
                Frontend development with Angular
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1237/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/vuejs.png" width={200} />
            <div>
              <h5> CS1237 Vue JS </h5>
              <p className="wd-dashboard-course-title">
                Frontend development with Vue.js
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1238/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/python.png" width={200} />
            <div>
              <h5> CS1238 Python </h5>
              <p className="wd-dashboard-course-title">Python</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1239/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/java.png" width={200} />
            <div>
              <h5> CS1239 Java </h5>
              <p className="wd-dashboard-course-title">Java</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1240/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/csharp.png" width={200} />
            <div>
              <h5> CS1240 C# </h5>
              <p className="wd-dashboard-course-title">C# </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
