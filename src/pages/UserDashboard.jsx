import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:4000/courses").then(res => setCourses(res.data));
  }, []);

  async function buyCourse(course) {
    await axios.post("http://localhost:4000/purchases", {
      userId: user.id,
      courseId: course.id,
      status: "paid"
    });

    alert("Ödeme başarılı!");
  }

  async function requestLiveLesson() {
    await axios.post("http://localhost:4000/liveRequests", {
      userId: user.id,
      status: "pending"
    });
    alert("Canlı ders talebi oluşturuldu!");
  }

  return (
    <div>
      <h2>Hoş geldin {user.name}</h2>
      <Link to="/user/my-courses">Satın Aldığım Eğitimler</Link>
     <button
        onClick={() => navigate("/live-request")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#667eea",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Canlı Ders Talebi
      </button>

      <h3>Tüm Eğitimler</h3>
      {courses.map(c => (
        <div key={c.id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <h4>{c.title}</h4>
          <p>{c.desc}</p>
          <p><b>{c.price}₺</b></p>
          <button onClick={() => buyCourse(c)}>Satın Al</button>
        </div>
      ))}
    </div>
  );
}
