import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { accessToken } = useAuth();
  if (!accessToken) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
