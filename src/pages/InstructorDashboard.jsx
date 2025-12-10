import { useEffect } from "react";
import axios from "axios";

export default function InstructorDashboard() {

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get("http://localhost:4000/liveRequests?status=pending");
      if (res.data.length > 0) {
        alert("Yeni canlı ders talebi var!");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Eğitmen Paneli</h2>
      <p>Gelen talepler otomatik bildirim olarak gelecektir.</p>
    </div>
  );
}
