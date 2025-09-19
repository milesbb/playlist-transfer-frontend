import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthContextType {
  accessToken: string | null;
  login: (credentials: {
    email?: string;
    username?: string;
    password: string;
  }) => Promise<void>;
  signup: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    sessionStorage.getItem("accessToken")
  );
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
    } else {
      sessionStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
  };

  const login = async ({
    email,
    username,
    password,
  }: {
    email?: string;
    username?: string;
    password: string;
  }) => {
    try {
      const emailToSend = email == "" ? undefined : email;
      const usernameToSend = username == "" ? undefined : username;
      const res = await fetch(`${API_URL}/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: emailToSend,
          username: usernameToSend,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        toast.error(data.message);
      } else {
        setAccessToken(data.accessToken);
        setUserId(data.userId);
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
      throw err;
    }
  };

  const signup = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await fetch(`${API_URL}/v1/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) throw new Error("Signup failed");

      const data: { accessToken: string } = await res.json();
      setAccessToken(data.accessToken);

      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      if (!accessToken) {
        navigate("/login");
        return;
      }

      let userIdToUse = userId;
      let nameToUse = "music nerd";

      if (!userIdToUse) {
        const meRes = await fetch(`${API_URL}/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });

        if (!meRes.ok) throw new Error("Failed to fetch user info");

        const meData: { id: number; username: string } = await meRes.json();

        userIdToUse = meData.id;
        nameToUse = meData.username;
      }

      const logoutRes = await fetch(`${API_URL}/v1/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ userId: userIdToUse }),
      });

      if (!logoutRes.ok) throw new Error("Logout failed");

      setAccessToken(null);
      toast.success(`Logged out successfully. Come back soon ${nameToUse}!`);
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Logout failed");
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, signup, logout, setAccessToken }}
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
