import { FaExternalLinkAlt } from "react-icons/fa";
import * as React from "react";

const API_URL = "/api/buttons";
const COMPANY_NAME = "ArakMedical Equipment Company ";

export default function UserPage() {
  // Add global style for blinking cursor animation if not present
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.document) {
      if (!document.head.querySelector("style[data-typewriter]")) {
        const style = document.createElement("style");
        style.setAttribute("data-typewriter", "true");
        style.innerHTML = `@keyframes blink { 0%, 100% { border-color: transparent; } 50% { border-color: #00bcd4; } }`;
        document.head.appendChild(style);
      }
    }
  }, []);
  const [buttons, setButtons] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  // Typewriter animation state
  const [typedName, setTypedName] = React.useState("");
  React.useEffect(() => {
    let i = 0;
    setTypedName("");
    const interval = setInterval(() => {
      setTypedName((prev) => {
        if (i < COMPANY_NAME.length) {
          i++;
          return COMPANY_NAME.slice(0, i);
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    fetchButtons();
  }, []);

  const fetchButtons = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setButtons(data);
    } catch {
      setError("Failed to load buttons");
    }
    setLoading(false);
  };

  // Detect theme from body class
  const [theme, setTheme] = React.useState(document.body.className || "light");
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
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
      className={`min-h-screen flex flex-col items-center p-4 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#232526] via-[#2c3e50] to-[#434343]"
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-amber-50"
      }`}
    >
      <div className="flex flex-col items-center mt-8 mb-8">
        <img
          src="/logo.png"
          alt="Logo"
          className={`w-24 h-24 mb-2 rounded-full shadow-2xl border-4 ${
            theme === "dark" ? "border-gray-700" : "border-white"
          }`}
        />
        <h1
          className={`text-3xl font-extrabold tracking-tight mb-2 drop-shadow-lg ${
            theme === "dark" ? "text-cyan-200" : "text-gray-800"
          }`}
        >
          <span
            style={{
              borderRight: "2px solid",
              paddingRight: 4,
              animation: "blink 1s steps(1) infinite",
            }}
          >
            {typedName}
          </span>
        </h1>
        <p
          className={`text-lg font-medium mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-500"
          }`}
        >
          نسعى دائماً بتقديم أفضل الاجهزةالليزر والتجميل لكافةالعيادات
          والمستشفيات
        </p>
      </div>
      <div className="w-full max-w-3xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <div
            className={`col-span-full text-center text-lg animate-pulse ${
              theme === "dark" ? "text-cyan-200" : "text-gray-500"
            }`}
          >
            Loading links...
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500 text-lg">
            {error}
          </div>
        ) : buttons.length === 0 ? (
          <div
            className={`col-span-full text-center text-lg ${
              theme === "dark" ? "text-cyan-400" : "text-gray-400"
            }`}
          >
            <FiLink2 className="inline mr-2 text-2xl align-middle" />
            No links available.
          </div>
        ) : (
          buttons.map((btn, i) => (
            <a
              key={btn.id}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
              className={
                `group rounded-3xl shadow-xl border-t-4 border-b-4 transition-all duration-200 flex flex-col items-center justify-center p-2 my-5 cursor-pointer hover:scale-105 hover:shadow-2xl relative overflow-hidden ` +
                (theme === "dark"
                  ? `bg-gradient-to-br from-[#232526] to-[#414345] border-cyan-700 hover:border-amber-600`
                  : `bg-white border-blue-400 hover:border-amber-50 ` +
                    (i % 2 === 0
                      ? "bg-gradient-to-br from-blue-50 to-amber-50"
                      : "bg-gradient-to-br from-amber-50 to-blue-50"))
              }
            >
              <span
                className={`text-xl font-bold mb-2 text-center transition-all ${
                  theme === "dark"
                    ? "text-cyan-200 group-hover:text-amber-50"
                    : "text-gray-800 group-hover:text-amber-600"
                }`}
              >
                {btn.name}
              </span>
              <span className="absolute right-4 bottom-4 opacity-20 text-6xl pointer-events-none">
                <FaExternalLinkAlt
                  className={
                    theme === "dark"
                      ? "text-cyan-700 group-hover:text-amber-600 text-2xl drop-shadow mb-"
                      : "text-blue-500 group-hover:text-amber-500 text-2xl drop-shadow mb-"
                  }
                />
              </span>
            </a>
          ))
        )}
      </div>
      <footer
        className={`mt-16 text-sm ${
          theme === "dark" ? "text-cyan-700" : "text-gray-400"
        }`}
      >
        <a
          href="https://www.facebook.com/profile.php?id=61555179886514"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          &copy; {new Date().getFullYear()} Promisify Team. All rights reserved.
        </a>
      </footer>
    </div>
  );
}
