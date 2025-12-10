import axios from "axios";

const LIVE = "http://localhost:4000/liveRequests";
const INSTRUCTORS = "http://localhost:4000/instructors";

export const sendLiveRequest = async (userId, courseId, preferredTime) => {
  // 1) canlı ders isteği kaydet
  const live = await axios.post(LIVE, {
    userId,
    courseId,
    preferredTime,
    createdAt: new Date().toISOString(),
  });

  // 2) en uygun eğitmeni seç (şimdilik LISTENİN İLKİ)
  const inst = await axios.get(INSTRUCTORS);
  const instructor = inst.data[0]; // basit simülasyon

  // 3) eğitmene bildirim ekle
  const notifList = instructor.notifications || [];
  const updatedInst = {
    ...instructor,
    notifications: [
      ...notifList,
      {
        type: "live-request",
        fromUserId: userId,
        courseId,
        createdAt: new Date().toISOString(),
      },
    ],
  };

  await axios.put(`${INSTRUCTORS}/${instructor.id}`, updatedInst);

  return live.data;
};

export const getInstructorNotifications = async (id) => {
  const ins = await axios.get(`${INSTRUCTORS}/${id}`);
  return ins.data.notifications || [];
};
