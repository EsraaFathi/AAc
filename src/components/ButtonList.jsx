import React from "react";
import { FaEdit, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";

// ButtonList: Admin list of buttons with edit/delete, styled as attractive cards
export default function ButtonList({ buttons, onEdit, onDelete }) {
  // Detect theme from body class
  const [theme, setTheme] = React.useState(document.body.className || "light");
  React.useEffect(() => {
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
    <div className="w-full max-w-3xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {buttons.map((btn, i) => (
        <a
          key={btn.id}
          href={btn.link}
          target="_blank"
          rel="noopener noreferrer"
          className={
            `group rounded-3xl shadow-xl border-t-4 border-b-4 transition-all duration-200 flex flex-col items-center justify-center p-2 my-5 cursor-pointer hover:scale-105 hover:shadow-2xl relative overflow-hidden ` +
            (theme === "dark"
              ? `bg-gradient-to-br from-[#232526] to-[#414345] border-cyan-700 hover:border-gray-600`
              : `bg-white border-blue-400 hover:border-gray-50 ` +
                (i % 2 === 0
                  ? "bg-gradient-to-br from-blue-50 to-gray-50"
                  : "bg-gradient-to-br from-gray-50 to-blue-50"))
          }
        >
          <span
            className={`text-xl font-bold mb-2 text-center transition-all ${
              theme === "dark"
                ? "text-cyan-200 group-hover:text-gray-50"
                : "text-gray-800 group-hover:text-gray-600"
            }`}
          >
            {btn.name}
          </span>
          <span className="block underline break-all mb-2 text-center w-full px-2">
            {btn.link}
          </span>
          <span className="absolute right-4 bottom-4 opacity-20 text-6xl pointer-events-none">
            <FaExternalLinkAlt
              className={
                theme === "dark"
                  ? "text-cyan-700 group-hover:text-gray-600 text-2xl drop-shadow mb-"
                  : "text-blue-500 group-hover:text-gray-500 text-2xl drop-shadow mb-"
              }
            />
          </span>
          <div className="flex gap-2 mt-2 z-10">
            <button
              className={`flex items-center gap-1 px-3 py-1 rounded-lg shadow font-semibold transition-all text-sm ${
                theme === "dark"
                  ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                  : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                onEdit(btn);
              }}
              title="Edit"
            >
              <FaEdit /> Edit
            </button>
            <button
              className={`flex items-center gap-1 px-3 py-1 rounded-lg shadow font-semibold transition-all text-sm ${
                theme === "dark"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                onDelete(btn.id);
              }}
              title="Delete"
            >
              <FaTrashAlt /> Delete
            </button>
          </div>
        </a>
      ))}
    </div>
  );
}
// removed duplicated/stray JSX after the main map block
