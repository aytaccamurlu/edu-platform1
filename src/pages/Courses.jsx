import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadCourses = async () => {
      const res = await axios.get("http://localhost:4000/courses");
      setCourses(res.data);
      setLoading(false);
    };

    loadCourses();
  }, []);

  const handleBuy = async (course) => {
    if (!user) {
      alert("Satın almak için giriş yapmalısınız!");
      return;
    }

    // Simüle ödeme (gerçek ödeme yok)
    const paymentSuccess = true;

    if (!paymentSuccess) {
      alert("Ödeme başarısız!");
      return;
    }

    // Purchase tablosuna kayıt ekle
    await axios.post("http://localhost:4000/purchases", {
      userId: user.id,
      courseId: course.id,
      date: new Date().toISOString()
    });

    alert("Satın alma başarılı!");
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Kurs Listesi</h2>

      {courses.map((course) => (
        <div key={course.id} style={{ 
          border: "1px solid #ccc", 
          padding: 20, 
          marginBottom: 15 
        }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p><b>Eğitmen:</b> {course.instructor}</p>
          <p><b>Fiyat:</b> ${course.price}</p>

          <button onClick={() => handleBuy(course)}>
            Satın Al
          </button>
        </div>
      ))}
    </div>
  );
}
