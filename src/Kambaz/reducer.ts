import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { enrollments } from "./Database";

const initialState = {
  enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollUser: (state, { payload }) => {
      const { user, course } = payload;
      const newEnrollment = {
        _id: v4(),
        user,
        course,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    unenrollUser: (state, { payload }) => {
      const { userId, courseId } = payload;
      state.enrollments = state.enrollments.filter((e) => {
        return !(e.user === userId && e.course === courseId);
      });
    },
  },
});
export const { enrollUser, unenrollUser } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
