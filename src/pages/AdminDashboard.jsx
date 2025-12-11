import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "", price: "" });

  // Kursları yükle
  const loadCourses = async () => {
    const res = await axios.get("http://localhost:4000/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Form input değişimi
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Yeni kurs ekle
  const handleAdd = () => {
    setForm({ title: "", desc: "", price: "" });
    setEditingCourse(null);
    setOpen(true);
  };

  // Kursu düzenle
  const handleEdit = (course) => {
    setForm({ title: course.title, desc: course.desc, price: course.price });
    setEditingCourse(course);
    setOpen(true);
  };

  // Kursu sil
  const handleDelete = async (id) => {
    if (window.confirm("Bu kursu silmek istediğinize emin misiniz?")) {
      await axios.delete(`http://localhost:4000/courses/${id}`);
      loadCourses();
    }
  };

  // Form submit (ekleme/güncelleme)
  const handleSubmit = async () => {
    if (editingCourse) {
      await axios.put(`http://localhost:4000/courses/${editingCourse.id}`, form);
    } else {
      await axios.post("http://localhost:4000/courses", form);
    }
    setOpen(false);
    loadCourses();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Admin Paneli
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
        Yeni Kurs Ekle
      </Button>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.desc}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Fiyat: {course.price}₺
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(course)}>Düzenle</Button>
                <Button size="small" color="error" onClick={() => handleDelete(course.id)}>Sil</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog: Ekleme / Düzenleme */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingCourse ? "Kurs Düzenle" : "Yeni Kurs Ekle"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Başlık" name="title" value={form.title} onChange={handleChange} fullWidth />
          <TextField label="Açıklama" name="desc" value={form.desc} onChange={handleChange} fullWidth multiline rows={3} />
          <TextField label="Fiyat" name="price" type="number" value={form.price} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>İptal</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingCourse ? "Güncelle" : "Ekle"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
