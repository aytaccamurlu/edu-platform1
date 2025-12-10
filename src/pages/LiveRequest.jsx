import React, { useState } from "react";
import axios from "axios";

export default function LiveRequest() {
  const [courseId, setCourseId] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleRequest = async () => {
    if (!user) return alert("Giriş yapın");

    // 1. Kullanıcı talebi kaydedilir
    const request = await axios.post("http://localhost:4000/liveRequests", {
      userId: user.id,
      courseId: parseInt(courseId),
      status: "pending",
      date: new Date().toISOString()
    });

    // 2. Eğitmen atama
    const instructorsRes = await axios.get("http://localhost:4000/instructors");
    const availableInstructor = instructorsRes.data.find(inst => inst.isAvailable);

    if (!availableInstructor) {
      alert("Şu anda müsait eğitmen yok");
      return;
    }

    // Eğitmen atandı
    await axios.patch(`http://localhost:4000/instructors/${availableInstructor.id}`, { isAvailable: false });

    // Talebi güncelle
    await axios.patch(`http://localhost:4000/liveRequests/${request.data.id}`, {
      instructorId: availableInstructor.id,
      status: "assigned"
    });

    alert(`Eğitmen atandı: ${availableInstructor.name}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Canlı Ders Talebi Oluştur</h2>
      <input
        type="number"
        placeholder="Kurs ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />
      <button onClick={handleRequest} style={{ marginLeft: 10 }}>Talep Gönder</button>
    </div>
  );
}
