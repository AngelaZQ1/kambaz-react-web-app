/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const QUIZ_ATTEMPTS_API = `${REMOTE_SERVER}/api/quiz-attempts`;

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
export const getLatestQuizAttemptForUser = async (
  userId: string,
  quizId: string
) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZ_ATTEMPTS_API}/latest/${userId}/${quizId}`
  );
  return data;
};
export const canUserAttemptQuiz = async (userId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/can-attempt/${userId}`
  );
  return data;
};
export const submitQuizAttempt = async (
  quizId: string,
  userId: string,
  score: number,
  answers: any[]
) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZ_ATTEMPTS_API}/${quizId}/${userId}`,
    {
      score,
      answers,
    }
  );
  return data;
};
