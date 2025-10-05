import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_CREDENTIALS = { username: "admin", password: "admin123" };

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(document.body.className || "light");
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.body.className || "light");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Theme toggle handler
  const handleThemeToggle = () => {
    if (document.body.className === "dark") {
      document.body.className = "light";
      setTheme("light");
    } else {
      document.body.className = "dark";
      setTheme("dark");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#232526] via-[#2c3e50] to-[#434343]"
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-amber-50"
      }`}
    >
      <div
        className={`w-full max-w-sm rounded-2xl shadow-2xl px-6 py-8 flex flex-col items-center ${
          theme === "dark"
            ? "bg-[#232526] border border-gray-700"
            : "bg-white border border-blue-100"
        }`}
      >
        <button
          onClick={handleThemeToggle}
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow transition focus:outline-none z-10 ${
            theme === "dark"
              ? "bg-gray-800 text-cyan-200 hover:bg-gray-700"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
          title={
            theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
        >
          {/* {theme === "dark" ? "☀️ Light" : "🌙 Dark"} */}
        </button>
        <img
          src="/logo.png"
          alt="Logo"
          className={`w-20 h-20 mb-4 rounded-full shadow-xl border-4 ${
            theme === "dark" ? "border-gray-700" : "border-white"
          }`}
        />
        <h2
          className={`text-xl sm:text-2xl font-extrabold mb-4 text-center tracking-tight drop-shadow-lg ${
            theme === "dark" ? "text-cyan-200" : "text-gray-800"
          }`}
        >
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            placeholder="Username"
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition text-base ${
              theme === "dark"
                ? "bg-[#232526] border-gray-700 text-cyan-100 focus:ring-cyan-400 placeholder-gray-400"
                : "bg-white border-blue-200 text-gray-800 focus:ring-blue-400 placeholder-gray-400"
            }`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition text-base ${
              theme === "dark"
                ? "bg-[#232526] border-gray-700 text-cyan-100 focus:ring-cyan-400 placeholder-gray-400"
                : "bg-white border-blue-200 text-gray-800 focus:ring-blue-400 placeholder-gray-400"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div className="text-red-500 text-sm text-center font-semibold animate-pulse">
              {error}
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-bold shadow-md transition text-lg mt-2 ${
              theme === "dark"
                ? "bg-cyan-700 hover:bg-cyan-800 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
