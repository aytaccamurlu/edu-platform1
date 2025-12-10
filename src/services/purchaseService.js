import axios from "axios";

const USERS = "http://localhost:4000/users";
const PURCHASES = "http://localhost:4000/purchases";

export const purchaseCourse = async (userId, courseId) => {
  // 1) satın alma kaydı oluştur
  await axios.post(PURCHASES, {
    userId,
    courseId,
    date: new Date().toISOString(),
  });

  // 2) kullanıcıya kursu ekle
  const user = await axios.get(`${USERS}/${userId}`);
  const updated = {
    ...user.data,
    purchasedCourses: [...(user.data.purchasedCourses || []), courseId],
  };

  await axios.put(`${USERS}/${userId}`, updated);

  return true;
};

export const getMyCourses = async (userId) => {
  const user = await axios.get(`${USERS}/${userId}`);
  const courseIds = user.data.purchasedCourses || [];

  const allCourses = await axios.get("http://localhost:4000/courses");

  return allCourses.data.filter((c) => courseIds.includes(c.id));
};
