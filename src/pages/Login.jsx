import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email ve şifre gerekli!");
      return;
    }

    try {
         const res = await axios.get("http://localhost:4000/users");

      console.log("Girdi email:", email);
      console.log("Girdi password:", password);
      console.log("Server users:", res.data);

      // Güvenli eşleşme (trim + lowercase email)
      const user = res.data.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password.trim()
      );

      if (!user) {
        alert("Email veya şifre yanlış!");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") navigate("/admin-dashboard");
      else if (user.role === "instructor") navigate("/instructor-dashboard");
      else navigate("/user-dashboard");
    } catch (error) {
      console.error(error);
      alert("Sunucuya bağlanılamıyor!");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #667eea, #764ba2)"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        width: "350px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Mini Edu Platform</h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "30px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "#667eea",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
