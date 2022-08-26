import { useAuth } from "context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  return user?.email ? <Outlet /> : <Navigate to="/signin" />;
};
