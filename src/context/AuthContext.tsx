import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.API_URL;

interface AuthContextType {
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // allow refresh token cookie
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data: { accessToken: string } = await res.json();
    setAccessToken(data.accessToken);

    navigate("/dashboard");
  };

  const logout = () => {
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
