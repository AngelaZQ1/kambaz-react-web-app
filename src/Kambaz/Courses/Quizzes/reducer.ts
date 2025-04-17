/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    // addModule: (state, { payload: module }) => {
    //   const newModule: any = {
    //     _id: uuidv4(),
    //     lessons: [],
    //     name: module.name,
    //     course: module.course,
    //   };
    //   state.quizzes = [...state.quizzes, newModule] as any;
    // },
    // updateModule: (state, { payload: module }) => {
    //   state.quizzes = state.quizzes.map((m: any) =>
    //     m._id === module._id ? module : m
    //   ) as any;
    // },
    // editModule: (state, { payload: moduleId }) => {
    //   state.quizzes = state.quizzes.map((m: any) =>
    //     m._id === moduleId ? { ...m, editing: true } : m
    //   ) as any;
    // },
  },
});
export const { setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;
