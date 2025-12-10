import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Kullanıcı giriş yapmamışsa login'e yönlendir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Eğer role bir array ise → ["user", "instructor", "admin"]
  if (Array.isArray(role)) {
    if (!role.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Eğer role tek string ise → "admin"
  if (!Array.isArray(role) && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Yetki tamam → sayfayı göster
  return children;
}
