import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
  enrollments: [],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enrollUser: (state, { payload }) => {
      const { user, course } = payload;
      const newEnrollment = {
        _id: v4(),
        user,
        course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenrollUser: (state, { payload }) => {
      const { userId, courseId } = payload;
      state.enrollments = state.enrollments.filter((e) => {
        return !(e.user === userId && e.course === courseId);
      });
    },
  },
});
export const { setEnrollments, enrollUser, unenrollUser } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
