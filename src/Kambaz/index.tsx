/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Courses from "./Courses";
import * as coursesClient from "./Courses/client";
import { setCourses } from "./Courses/reducer";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function Kambaz() {
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    const courses = await coursesClient.fetchAllCourses();
    dispatch(setCourses(courses));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="Account/*" element={<Account />} />
          <Route
            path="Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard course={course} setCourse={setCourse} />
              </ProtectedRoute>
            }
          />
          <Route
            path="Courses/:cid/*"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
