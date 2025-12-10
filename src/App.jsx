import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import UserDashboard from "./pages/UserDashboard";
import MyCourses from "./pages/MyCourses";
import Courses from "./pages/Courses";
import LiveRequest from "./pages/LiveRequest";
import ProtectedRoute from "./components/ProtectedRoute";
import Purchase from "./pages/Purchase";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute role="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-courses"
          element={
            <ProtectedRoute role="user">
              <MyCourses />
            </ProtectedRoute>
          }
        />

      <Route 
  path="/courses"
  element={
    <ProtectedRoute role={["user", "instructor", "admin"]}>
      <Courses />
    </ProtectedRoute>
  }
/>

        <Route
          path="/live-request"
          element={
            <ProtectedRoute role="user">
              <LiveRequest />
            </ProtectedRoute>
          }
        />
      <Route
        path="/purchase"
        element={
          <ProtectedRoute role="user">
            <Purchase />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
