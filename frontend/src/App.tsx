import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function LogoutAndRegister() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<LogoutAndRegister/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
