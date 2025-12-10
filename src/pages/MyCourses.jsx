import { useEffect, useState } from "react";
import axios from "axios";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function load() {
      if (!user) return;

      const purchasesRes = await axios.get(`http://localhost:4000/purchases?userId=${user.id}`);
      const purchases = purchasesRes.data;

      const coursesRes = await axios.get("http://localhost:4000/courses");
      const allCourses = coursesRes.data;

      const myCourses = allCourses.filter(c =>
        purchases.some(p => p.courseId === c.id)
      );

      setMyCourses(myCourses);
    }

    load();
  }, [user]);

  if (!user) return <p>Giriş yapın</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Satın Aldığım Eğitimler</h2>
      {myCourses.length === 0 && <p>Henüz satın alınan kurs yok</p>}
      {myCourses.map(c => (
        <div key={c.id} style={{padding:"10px", margin:"10px 0", border:"1px solid #ccc", borderRadius:"6px"}}>
          <h3>{c.title}</h3>
          <p>{c.desc}</p>
          <p>Fiyat: {c.price}₺</p>
        </div>
      ))}
    </div>
  );
}
