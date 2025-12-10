import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await axios.get("http://localhost:4000/courses");
      setCourses(res.data);
    }
    load();
  }, []);

  const selectCourse = (course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    navigate("/purchase");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Kurslar</h2>
      {courses.map(c => (
        <div key={c.id} style={{border:"1px solid #ccc", margin:"10px 0", padding:"10px"}}>
          <h3>{c.title}</h3>
          <p>{c.desc}</p>
          <p>Fiyat: ₺{c.price}</p>
          <button onClick={()=>selectCourse(c)}>Satın Al</button>
        </div>
      ))}
    </div>
  );
}
