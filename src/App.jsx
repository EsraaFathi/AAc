import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import "./App.css";
function App() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  React.useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app-container ${theme}`}>
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 1000,
          background: "none",
          border: "none",
          padding: 8,
          cursor: "pointer",
        }}
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <FaMoon size={24} color="#333" title="Switch to dark mode" />
        ) : (
          <FaSun size={26} color="#FFD700" title="Switch to light mode" />
        )}
      </button>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
