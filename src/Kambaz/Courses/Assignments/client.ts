/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const getAllAssignments = async () => {
  const response = await axios.get(`${ASSIGNMENTS_API}`);
  return response.data;
};
export const createAssignment = async (assignment: any, courseId: string) => {
  const response = await axios.post(
    `${ASSIGNMENTS_API}/${courseId}/assignment`,
    assignment
  );
  return response.data;
};
export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};
// export const deleteAssignment = async (module: any) => {
//   const { data } = await axios.put(`${ASSIGNMENTS_API}/${module._id}`, module);
//   return data;
// };
