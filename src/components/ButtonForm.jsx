import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";

export default function ButtonForm({ onSave, editingButton }) {
  const [name, setName] = useState(editingButton ? editingButton.name : "");
  const [link, setLink] = useState(editingButton ? editingButton.link : "");

  useEffect(() => {
    setName(editingButton ? editingButton.name : "");
    setLink(editingButton ? editingButton.link : "");
  }, [editingButton]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !link.trim()) return;
    onSave({ name, link, id: editingButton ? editingButton.id : Date.now() });
    setName("");
    setLink("");
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
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 p-6 rounded-2xl shadow-xl border transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#232526] border-[#333]"
          : "bg-white border-gray-200"
      }`}
    >
      <input
        type="text"
        placeholder="Button Name"
        className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
          theme === "dark"
            ? "bg-[#18191a] border-[#444] text-cyan-100 focus:ring-cyan-400 placeholder-gray-500"
            : "border-gray-300 focus:ring-blue-400"
        }`}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Button Link (https://...)"
        className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
          theme === "dark"
            ? "bg-[#18191a] border-[#444] text-cyan-100 focus:ring-cyan-400 placeholder-gray-500"
            : "border-gray-300 focus:ring-blue-400"
        }`}
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <button
        type="submit"
        className={`flex items-center justify-center gap-2 font-semibold py-2 rounded-lg shadow-md transition-all text-lg ${
          editingButton
            ? theme === "dark"
              ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
            : theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {editingButton ? <FaEdit /> : <FaPlus />}{" "}
        {editingButton ? "Update Button" : "Add Button"}
      </button>
    </form>
  );
}
