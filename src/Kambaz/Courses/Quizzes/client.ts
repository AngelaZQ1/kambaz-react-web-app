/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const getAllQuizzes = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${courseId}`);
  return response.data;
};
// export const createAssignment = async (assignment: any, courseId: string) => {
//   const response = await axiosWithCredentials.post(
//     `${QUIZZES_API}/${courseId}/assignment`,
//     assignment
//   );
//   return response.data;
// };
// export const updateAssignment = async (assignment: any) => {
//   const { data } = await axiosWithCredentials.put(
//     `${QUIZZES_API}/${assignment._id}`,
//     assignment
//   );
//   return data;
// };
export const deleteQuiz = async (quizId: any) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};
