import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button
} from "@mui/material";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function load() {
      if (!user) return;

      const purchasesRes = await axios.get(`http://localhost:4000/purchases?userId=${user.id}`);
      const purchases = purchasesRes.data;

      const coursesRes = await axios.get("http://localhost:4000/courses");
      const allCourses = coursesRes.data;

      const myCourses = allCourses.filter(c =>
        purchases.some(p => p.courseId === c.id)
      );

      setMyCourses(myCourses);
    }

    load();
  }, [user]);

  if (!user) return <Typography variant="h6" color="error" p={3}>Giriş yapın</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Satın Aldığım Eğitimler
      </Typography>

      {myCourses.length === 0 && (
        <Typography variant="body1">Henüz satın alınan kurs yok</Typography>
      )}

      <Grid container spacing={3}>
        {myCourses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {course.desc}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Fiyat: {course.price}₺
                </Typography>
              </CardContent>
              <Box p={2}>
                <Button variant="contained" fullWidth color="primary">
                  Eğitimi Aç
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
