import axios from "axios";

const API = "http://localhost:4000/users";

export const login = async (username, password) => {
  const res = await axios.get(API);
  const users = res.data;

  const found = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!found) throw new Error("Geçersiz kullanıcı");

  return found;
};
