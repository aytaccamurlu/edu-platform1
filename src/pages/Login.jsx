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
      const res = await axios.get(
        `http://localhost:4000/users?email=${email}&password=${password}`
      );

      if (res.data.length === 0) {
        alert("Email veya şifre yanlış!");
        return;
      }

      const user = res.data[0];

      // Kullanıcıyı localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(user));

      // Rol bazlı yönlendirme
      if (user.role === "admin") navigate("/admin-dashboard");
      else if (user.role === "instructor") navigate("/instructor-dashboard");
      else navigate("/user-dashboard");

    } catch (error) {
      console.error("Login error:", error);
      alert("Sunucuya bağlanılamıyor. JSON Server çalışıyor mu?");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
}
