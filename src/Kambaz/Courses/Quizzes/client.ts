/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const getAllQuizzes = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${courseId}`);
  return response.data;
};
export const createQuiz = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${courseId}`
  );
  return data;
};
export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};
export const deleteQuiz = async (quizId: any) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};
export const addQuestionToQuiz = async (quizId: string, questionData: any) => {
  console.log("Adding question to quiz:", quizId, questionData);
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    questionData
  );
  return data;
};
export const deleteQuestionFromQuiz = async (quizId: string, question: any) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}/questions/${question._id}`
  );
  return data;
};
export const updateQuestion = async (questionId: string, questionData: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${questionId}`,
    questionData
  );
  return data;
};
