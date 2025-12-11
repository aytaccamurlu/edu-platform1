import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from "@mui/material";
import Header from "../components/Header";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await axios.get(`http://localhost:4000/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [id]);

  if (loading) return <CircularProgress sx={{ m: 3 }} />;
  if (!course) return <Typography sx={{ m: 3 }}>Kurs bulunamadı</Typography>;

  return (
    <Box p={3}>
      <Header title={course.title} />

      {/* Kurs Bilgileri */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Kurs Detayları
        </Typography>

        <Box mb={1}>
          <Typography variant="subtitle2" color="text.secondary">Açıklama:</Typography>
          <Typography variant="body1">{course.desc}</Typography>
        </Box>

        <Box mb={1} display="flex" gap={2}>
          <Chip label={`Fiyat: ${course.price}₺`} color="primary" />
          {course.duration && <Chip label={`Ders Saati: ${course.duration} saat`} color="success" />}
          {course.instructor && <Chip label={`Eğitmen: ${course.instructor}`} color="info" />}
        </Box>
      </Paper>

      {/* Ders İçeriği */}
      <Typography variant="h6" mb={1}>Ders İçeriği</Typography>
      <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 1 }}>
        {course.contents && course.contents.length > 0 ? (
          <List>
            {course.contents.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`${index + 1}. ${item.title}`}
                    secondary={item.detail}
                  />
                </ListItem>
                {index < course.contents.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">Ders içeriği eklenmemiş.</Typography>
        )}
      </Paper>
    </Box>
  );
}
