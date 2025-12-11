import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

export default function LiveRequest() {
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleRequest = async () => {
    if (!user) {
      setMessage("Giriş yapın");
      return;
    }

    try {
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
        setMessage("Şu anda müsait eğitmen yok");
        return;
      }

      // Eğitmen atandı
      await axios.patch(`http://localhost:4000/instructors/${availableInstructor.id}`, { isAvailable: true });

      // Talebi güncelle
      await axios.patch(`http://localhost:4000/liveRequests/${request.data.id}`, {
        instructorId: availableInstructor.id,
        status: "assigned"
      });

      setMessage(`Eğitmen atandı: ${availableInstructor.name}`);
      setCourseId(""); // inputu temizle
    } catch (err) {
      setMessage("Talep gönderilirken hata oluştu");
      console.error(err);
    }
  };

  return (
    <Box p={3} maxWidth={400} mx="auto">
      <Typography variant="h5" mb={3}>
        Canlı Ders Talebi Oluştur
      </Typography>

      {message && (
        <Alert severity={message.includes("hata") || message.includes("Giriş") ? "error" : "success"} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <TextField
        label="Kurs ID"
        type="number"
        fullWidth
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleRequest}>
        Talep Gönder
      </Button>
    </Box>
  );
}
