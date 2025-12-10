import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Purchase() {
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selected = localStorage.getItem("selectedCourse");
    if (!selected) {
      alert("Satın alınacak kurs bulunamadı!");
      navigate("/courses");
      return;
    }
    setCourse(JSON.parse(selected));
  }, []);

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const purchaseData = {
      userId: user.id,
      courseId: course.id,
      price: course.price,
      status: "success",
      date: new Date().toISOString()
    };

    // JSON SERVER POST
    await axios.post("http://localhost:4000/purchases", purchaseData);

    alert("Ödeme başarılı! Kurs hesabınıza tanımlandı.");
    localStorage.removeItem("selectedCourse");
    navigate("/my-courses");
  };

  if (!course) return null;

  return (
    <div style={{ padding: 40 }}>
      <h2>Ödeme Sayfası</h2>
      <h3>{course.title}</h3>
      <p>Fiyat: ₺{course.price}</p>

      <button onClick={handlePayment} style={{ marginTop: 20 }}>
        Ödemeyi Tamamla
      </button>
    </div>
  );
}
