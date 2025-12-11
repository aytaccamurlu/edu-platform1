import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Button, Chip } from "@mui/material";
import Header from "../components/Header";

export default function InstructorDashboard() {
  const [liveRequests, setLiveRequests] = useState([]);

  // Canlı ders taleplerini yükle
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:4000/liveRequests?status=pending");
      setLiveRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests(); // ilk yükleme
    const interval = setInterval(fetchRequests, 5000); // 5 saniyede bir güncelle
    return () => clearInterval(interval);
  }, []);

  // Talebi tamamla
  const handleComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/liveRequests/${id}`, { status: "completed" });
      // UI’yi anında güncelle
      setLiveRequests(prev => prev.filter(r => r.id !== id));
      alert("Talep tamamlandı!");
    } catch (err) {
      console.error(err);
      alert("Talep tamamlanamadı!");
    }
  };

  return (
    <Box p={3}>
      <Header title="Eğitmen Paneli" />

      <Typography variant="h6" mb={1}>Gelen Canlı Ders Talepleri</Typography>
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        {liveRequests.length === 0 && <Typography>Henüz yeni talep yok</Typography>}
        <List>
          {liveRequests.map((r) => (
            <React.Fragment key={r.id}>
              <ListItem
                secondaryAction={
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleComplete(r.id)}
                  >
                    Tamamla
                  </Button>
                }
              >
                <ListItemText
                  primary={`Kullanıcı ID: ${r.userId}`}
                  secondary={
                    <>
                      <Chip label={`Kurs ID: ${r.courseId || "-"}`} size="small" sx={{ mr: 1 }} />
                      <Chip label={`Durum: ${r.status}`} size="small" color="warning" />
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
