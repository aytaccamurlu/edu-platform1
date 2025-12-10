import axios from "axios";

const API = "http://localhost:4000/courses";

export const getCourses = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getCourseById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};
