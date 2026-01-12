import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import title from "../assets/title_light.png";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

interface HeaderProps {
  location: string;
}

function Header({ location }: HeaderProps) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full flex justify-between items-center p-4 bg-[#2a2a2a]">
      <div>
        <img
          src={title}
          alt="Playlist Transfer"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <h1>{location}</h1>
      </div>
      <div className="flex items-center space-x-4 mx-2">
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={() => navigate("/profile")}
        >
          Profile
        </span>
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          {loading ? <Spinner size={20} /> : "Logout"}
        </span>
      </div>
    </header>
  );
}

export default Header;
