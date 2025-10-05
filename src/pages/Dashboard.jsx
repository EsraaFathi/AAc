import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ButtonForm from "../components/ButtonForm";
import ButtonList from "../components/ButtonList";
import {
  FaSignOutAlt,
  FaUserCog,
  FaCloudUploadAlt,
  FaRegListAlt,
} from "react-icons/fa";

const API_URL = "/api/buttons";
const LOGO_API_URL = "/logo.png";

export default function Dashboard() {
  const [buttons, setButtons] = useState([]);
  const [editingButton, setEditingButton] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const logoInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/login");
    }
    fetchButtons();
    fetchLogo();
    // eslint-disable-next-line
  }, [navigate]);

  const fetchButtons = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setButtons(data);
    } catch (err) {
      setError("Failed to load buttons");
    }
    setLoading(false);
  };

  const fetchLogo = async () => {
    setLogoUrl(LOGO_API_URL + "?" + Date.now());
  };

  const handleSave = async (btn) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(btn),
      });
      if (!res.ok) throw new Error();
      await fetchButtons();
      setEditingButton(null);
    } catch {
      setError("Failed to save button");
    }
  };

  const handleEdit = (btn) => setEditingButton(btn);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await fetchButtons();
      setEditingButton(null);
    } catch {
      setError("Failed to delete button");
    }
  };

  const handleLogoChange = async (e) => {
    setLogoUploading(true);
    try {
      const file = e.target.files[0];
      if (!file) return;
      alert("قم باستبدال ملف logo.png في مجلد public ليتغير الشعار.");
      await fetchLogo();
    } catch {}
    setLogoUploading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  // Detect theme from body class
  const [theme, setTheme] = useState(document.body.className || "light");
  useEffect(() => {
    const observer = new window.MutationObserver(() => {
      setTheme(document.body.className || "light");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#18191a] via-[#232526] to-[#434343]"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`flex items-center gap-2 text-3xl font-extrabold tracking-tight drop-shadow-lg ${
              theme === "dark" ? "text-cyan-200" : "text-gray-800"
            }`}
          >
            <FaUserCog className="inline mb-1" /> Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 ${
              theme === "dark"
                ? "bg-[#232526] text-cyan-200 hover:bg-[#2c3e50]"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
        <div className="mb-8 flex flex-col items-center">
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              className={`w-24 h-24 mb-2 rounded-full shadow-2xl border-4 ${
                theme === "dark" ? "border-gray-700" : "border-white"
              }`}
            />
          )}
          {/* <label
            htmlFor="logo-upload"
            className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg font-semibold shadow transition-all duration-200 mb-2 ${
              theme === "dark"
                ? "bg-[#232526] text-cyan-200 hover:bg-[#2c3e50]"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            <FaCloudUploadAlt />
            {logoUploading ? "Uploading..." : "Change Logo"}
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              ref={logoInputRef}
              onChange={handleLogoChange}
              className="hidden"
              disabled={logoUploading}
            />
          </label> */}
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div
          className={`rounded-2xl shadow-xl p-6 mb-8 ${
            theme === "dark" ? "bg-[#232526]" : "bg-white"
          }`}
        >
          <h2
            className={`flex items-center gap-2 text-xl font-bold mb-4 ${
              theme === "dark" ? "text-cyan-200" : "text-blue-700"
            }`}
          >
            <FaRegListAlt /> Manage Buttons
          </h2>
          <ButtonForm onSave={handleSave} editingButton={editingButton} />
        </div>
        {loading ? (
          <div
            className={`text-center mt-6 ${
              theme === "dark" ? "text-cyan-200" : "text-gray-500"
            }`}
          >
            Loading...
          </div>
        ) : (
          <div
            className={`rounded-2xl shadow-xl p-6 ${
              theme === "dark" ? "bg-[#232526]" : "bg-white"
            }`}
          >
            <ButtonList
              buttons={buttons}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
