import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import title from "../assets/title_light.png";
import { useAuth } from "../context/AuthContext";

function Header() {
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
      <img src={title} alt="Playlist Transfer" className="h-8" />
      <span
        className="text-white cursor-pointer hover:underline"
        onClick={handleLogout}
      >
        Logout
      </span>
    </header>
  );
}

export default Header;
