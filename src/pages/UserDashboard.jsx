import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid
} from "@mui/material";

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

  return (
    <Box p={3}>
      {/* Başlık ve Butonlar */}
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" mb={{ xs: 2, sm: 0 }}>
          Hoş geldin, {user.name} 👋
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/user/my-courses"
          >
            Satın Aldığım Eğitimler
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/live-request")}
          >
            Canlı Ders Talebi
          </Button>
        </Box>
      </Box>

      {/* Tüm Eğitimler */}
      <Typography variant="h5" mb={2}>
        Tüm Eğitimler
      </Typography>
      <Grid container spacing={3}>
        {courses.map(course => (
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
                  {course.price}₺
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  fullWidth
                  color="success"
                  onClick={() => buyCourse(course)}
                >
                  Satın Al
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
