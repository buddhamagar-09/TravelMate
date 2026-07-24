import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not an admin
  if (user?.usertype !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin user
  return <Outlet />;
}

export default ProtectedRoute;