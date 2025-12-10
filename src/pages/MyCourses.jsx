import { useEffect, useState } from "react";
import axios from "axios";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function load() {
      const purchases = await axios.get("http://localhost:4000/purchases");
      const userPurchases = purchases.data.filter(p => p.userId === user.id);

      const allCourses = await axios.get("http://localhost:4000/courses");

      const result = allCourses.data.filter(c =>
        userPurchases.some(p => p.courseId === c.id)
      );

      setMyCourses(result);
    }
    load();
  }, []);

  return (
    <div>
      <h2>Satın Aldığım Eğitimler</h2>
      {myCourses.map(c => (
        <p key={c.id}>{c.title}</p>
      ))}
    </div>
  );
}
