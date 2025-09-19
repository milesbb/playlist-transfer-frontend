import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import FormField from "../components/FormField";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({
        email: email || undefined,
        username: username || undefined,
        password,
      });
      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <FormField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <Spinner size={20} /> : "Login"}
        </button>
      </form>
    </div>
  );
}
