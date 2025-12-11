import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // kullanıcıyı çıkış yap
    navigate("/"); // login sayfasına yönlendir
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      <Box>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          Geri
        </Button>
        <Typography variant="h5" component="span">{title}</Typography>
      </Box>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
