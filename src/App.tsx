import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./apiInteraction/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import { useEffect, useState } from "react";
import { checkAndRefreshTokenOnLanding } from "./apiInteraction/apiFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import useBetaFlagFromQuery from "./utils/checkIfBeta";

function App() {
  useBetaFlagFromQuery();
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      checkAndRefreshTokenOnLanding(setAccessToken, navigate);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage loadingRefresh={loading} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
