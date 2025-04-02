/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const getEnrollments = async () => {
  const { data } = await axios.get(ENROLLLMENTS_API);
  return data;
};
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.post(
    `${ENROLLLMENTS_API}/userId/${userId}/courseId/${courseId}`
  );
  return data;
};
export const unenrollUser = async (userId: string, courseId: string) => {
  const { data } = await axios.delete(
    `${ENROLLLMENTS_API}/${userId}/${courseId}`
  );
  return data;
};
