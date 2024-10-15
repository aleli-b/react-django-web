import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface FormProps {
  route: string;
  method: "login" | "register";
}

function Form({ route, method }: FormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error: unknown) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const title = method === "login" ? "Login" : "Register";

  if (loading) return <div><p>Loading...</p></div>;

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{title}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="form-button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;