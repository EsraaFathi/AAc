// import { FaExternalLinkAlt } from "react-icons/fa";
// import { FiLink2 } from "react-icons/fi"; // ADDED MISSING IMPORT
// import * as React from "react";

// const API_URL = "http://localhost:3001/api/buttons";
// const COMPANY_NAME = "ArakMedical Equipment Company ";

// export default function UserPage() {
//   // Add global style for blinking cursor animation if not present
//   React.useEffect(() => {
//     if (typeof window !== "undefined" && window.document) {
//       if (!document.head.querySelector("style[data-typewriter]")) {
//         const style = document.createElement("style");
//         style.setAttribute("data-typewriter", "true");
//         style.innerHTML = `@keyframes blink { 0%, 100% { border-color: transparent; } 50% { border-color: #00bcd4; } }`;
//         document.head.appendChild(style);
//       }
//     }
//   }, []);

//   const [buttons, setButtons] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState("");
//   // Typewriter animation state
//   const [typedName, setTypedName] = React.useState("");

//   React.useEffect(() => {
//     let i = 0;
//     setTypedName("");
//     const interval = setInterval(() => {
//       setTypedName((prev) => {
//         if (i < COMPANY_NAME.length) {
//           i++;
//           return COMPANY_NAME.slice(0, i);
//         } else {
//           clearInterval(interval);
//           return prev;
//         }
//       });
//     }, 120);
//     return () => clearInterval(interval);
//   }, []);

//   React.useEffect(() => {
//     fetchButtons();
//   }, []);

//   // Refetch buttons when the page/tab becomes active so live viewers get updates
//   React.useEffect(() => {
//     let timeout = null;
//     const refetch = () => {
//       // debounce quick focus/visibility events
//       if (timeout) clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         fetchButtons();
//       }, 500);
//     };

//     const onFocus = () => refetch();
//     const onVisibility = () => {
//       if (document.visibilityState === "visible") refetch();
//     };

//     window.addEventListener("focus", onFocus);
//     document.addEventListener("visibilitychange", onVisibility);
//     return () => {
//       window.removeEventListener("focus", onFocus);
//       document.removeEventListener("visibilitychange", onVisibility);
//       if (timeout) clearTimeout(timeout);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const fetchButtons = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(API_URL);
//       const data = await res.json();
//       setButtons(data);
//     } catch {
//       setError("Failed to load buttons");
//     }
//     setLoading(false);
//   };

//   // Detect theme from body class
//   const [theme, setTheme] = React.useState(document.body.className || "light");
//   React.useEffect(() => {
//     const observer = new MutationObserver(() => {
//       setTheme(document.body.className || "light");
//     });
//     observer.observe(document.body, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       className={`min-h-screen flex flex-col items-center p-4 transition-colors duration-500 ${
//         theme === "dark"
//           ? "bg-gradient-to-br from-[#232526] via-[#2c3e50] to-[#434343]"
//           : "bg-gradient-to-br from-blue-100 via-purple-100 to-gray-50"
//       }`}
//     >
//       <div className="flex flex-col items-center mt-6 mb-6 sm:mt-8 sm:mb-8">
//         <img
//           src="/logo.png"
//           alt="Logo"
//           className={`w-20 h-20 sm:w-24 sm:h-24 mb-2 rounded-full shadow-2xl border-4 ${
//             theme === "dark" ? "border-gray-700" : "border-white"
//           } transition-all duration-300`}
//         />
//         <h1
//           className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 sm:mb-2 drop-shadow-lg ${
//             theme === "dark" ? "text-cyan-200" : "text-gray-800"
//           }`}
//         >
//           <span
//             style={{
//               borderRight: "2px solid",
//               paddingRight: 3,
//               animation: "blink 1s steps(1) infinite",
//               fontSize: "1em",
//               wordBreak: "break-word",
//               display: "inline-block",
//               minHeight: "1.2em",
//               lineHeight: 1.2,
//             }}
//           >
//             {typedName}
//           </span>
//         </h1>
//         <p
//           className={`text-base sm:text-lg font-medium mb-1 sm:mb-2 text-center ${
//             theme === "dark" ? "text-gray-300" : "text-gray-500"
//           }`}
//         >
//           نسعى دائماً بتقديم أفضل الاجهزة الليزر والتجميل لكافة العيادات
//           <br className="hidden sm:block" />
//           والمستشفيات
//         </p>
//       </div>
//       <div className="w-full max-w-3xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {loading ? (
//           <div
//             className={`col-span-full text-center text-lg animate-pulse ${
//               theme === "dark" ? "text-cyan-200" : "text-gray-500"
//             }`}
//           >
//             Loading links...
//           </div>
//         ) : error ? (
//           <div className="col-span-full text-center text-red-500 text-lg">
//             {error}
//           </div>
//         ) : buttons.length === 0 ? (
//           <div
//             className={`col-span-full text-center text-lg ${
//               theme === "dark" ? "text-cyan-400" : "text-gray-400"
//             }`}
//           >
//             <FiLink2 className="inline mr-2 text-2xl align-middle" />
//             No links available.
//           </div>
//         ) : (
//           buttons.map((btn, i) => (
//             <a
//               key={btn.id}
//               href={btn.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={
//                 `group rounded-3xl shadow-xl border-t-4 border-b-4 transition-all duration-200 flex flex-col items-center justify-center p-2 my-5 cursor-pointer hover:scale-105 hover:shadow-2xl relative overflow-hidden ` +
//                 (theme === "dark"
//                   ? `bg-gradient-to-br from-[#232526] to-[#414345] border-cyan-700 hover:border-gray-200`
//                   : `bg-white border-blue-400 hover:border-gray-50 ` +
//                     (i % 2 === 0
//                       ? "bg-gradient-to-br from-blue-50 to-gray-50"
//                       : "bg-gradient-to-br from-gray-50 to-blue-50"))
//               }
//             >
//               <span
//                 className={`text-xl font-bold mb-2 text-center transition-all ${
//                   theme === "dark"
//                     ? "text-cyan-200 group-hover:text-gray-50"
//                     : "text-gray-800 group-hover:text-gray-600"
//                 }`}
//               >
//                 {btn.name}
//               </span>
//               <span className="absolute right-4 bottom-4 opacity-20 text-6xl pointer-events-none">
//                 <FaExternalLinkAlt
//                   className={
//                     theme === "dark"
//                       ? "text-cyan-700 group-hover:text-gray-600 text-2xl drop-shadow mb-"
//                       : "text-blue-500 group-hover:text-gray-500 text-2xl drop-shadow mb-"
//                   }
//                 />
//               </span>
//             </a>
//           ))
//         )}
//       </div>
//       <footer
//         className={`mt-16 text-sm ${
//           theme === "dark" ? "text-cyan-700" : "text-gray-400"
//         }`}
//       >
//         <a
//           href="https://www.facebook.com/profile.php?id=61555179886514"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="hover:underline"
//         >
//           &copy; {new Date().getFullYear()} Promisify Team. All rights reserved.
//         </a>
//       </footer>
//     </div>
//   );
// }

import * as React from "react";

const API_URL = "http://localhost:3001/api/buttons";
const COMPANY_NAME = "ArakMedical Equipment Company";

export default function UserPage() {
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
    }, 100);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    fetchButtons();
  }, []);

  React.useEffect(() => {
    let timeout = null;
    const refetch = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        fetchButtons();
      }, 500);
    };

    const onFocus = () => refetch();
    const onVisibility = () => {
      if (document.visibilityState === "visible") refetch();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
      if (timeout) clearTimeout(timeout);
    };
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
      className={`min-h-screen flex flex-col items-center transition-colors duration-500 px-4 py-8 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]"
          : "bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-cyan-500" : "bg-blue-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-300"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 ${
            theme === "dark" ? "bg-cyan-400" : "bg-indigo-300"
          }`}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className={`absolute inset-0 opacity-5 ${
          theme === "dark"
            ? "bg-[radial-gradient(#ffffff_1px,transparent_1px)]"
            : "bg-[radial-gradient(#000000_1px,transparent_1px)]"
        }`}
        style={{ backgroundSize: "50px 50px" }}
      ></div>
      {/* Header Section */}
      <div className="w-full max-w-5xl flex flex-col items-center mb-12 relative z-10">
        <div className="relative mb-6">
          <div
            className={`absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse ${
              theme === "dark" ? "bg-cyan-500" : "bg-blue-400"
            }`}
          ></div>
          <img
            src="/logo.png"
            alt="Logo"
            className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-2xl border-4 ${
              theme === "dark" ? "border-cyan-600" : "border-blue-500"
            } transition-all duration-300`}
          />
        </div>

        <h1
          className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${
            theme === "dark" ? "text-cyan-100" : "text-gray-900"
          }`}
        >
          <span
            style={{
              borderRight: "3px solid",
              paddingRight: 4,
              animation: "blink 1s steps(1) infinite",
              display: "inline-block",
            }}
          >
            {typedName}
          </span>
        </h1>

        <p
          className={`text-lg sm:text-xl font-medium text-center max-w-2xl leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
          dir="rtl"
        >
          نسعى دائماً بتقديم أفضل الأجهزة الليزر والتجميل لكافة العيادات
          والمستشفيات
        </p>
      </div>

      {/* Main Content - Cards in Rows */}
      <div className="w-full max-w-3xl mb-auto relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div
                className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${
                  theme === "dark" ? "border-cyan-500" : "border-blue-500"
                }`}
              ></div>
              <p
                className={`text-lg font-medium ${
                  theme === "dark" ? "text-cyan-200" : "text-gray-600"
                }`}
              >
                Loading links...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <div
              className={`${
                theme === "dark"
                  ? "bg-red-900/20 border-red-700"
                  : "bg-red-50 border-red-300"
              } border-2 rounded-xl p-6`}
            >
              <p
                className={`text-lg font-medium ${
                  theme === "dark" ? "text-red-300" : "text-red-600"
                }`}
              >
                {error}
              </p>
            </div>
          </div>
        ) : buttons.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div
              className={`flex flex-col items-center gap-3 ${
                theme === "dark" ? "text-cyan-400" : "text-gray-500"
              }`}
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <p className="text-lg font-medium">No links available</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {buttons.map((btn, i) => (
              <a
                key={btn.id}
                href={btn.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-[#2a2d32] to-[#323539] border-cyan-800/30 hover:border-cyan-700/50 hover:shadow-cyan-900/20"
                    : "bg-gradient-to-r from-white to-blue-50/30 border-blue-200/50 hover:border-blue-400/60 hover:shadow-blue-200/30"
                } hover:-translate-y-1`}
              >
                {/* Position Badge */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                    theme === "dark"
                      ? "bg-cyan-900/30 text-cyan-300"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {i + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-semibold truncate ${
                      theme === "dark"
                        ? "text-cyan-100 group-hover:text-white"
                        : "text-gray-800 group-hover:text-gray-900"
                    }`}
                  >
                    {btn.name}
                  </h3>
                </div>

                {/* Icon Button */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    theme === "dark"
                      ? "bg-cyan-900/30 group-hover:bg-cyan-700/40"
                      : "bg-blue-100 group-hover:bg-blue-200"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      theme === "dark" ? "text-cyan-400" : "text-blue-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>

                {/* Hover indicator line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all opacity-0 group-hover:opacity-100 ${
                    theme === "dark" ? "bg-cyan-500" : "bg-blue-500"
                  }`}
                />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`w-full mt-12 py-6 text-center`}>
        <a
          href="https://www.facebook.com/profile.php?id=61555179886514"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-medium transition-colors ${
            theme === "dark"
              ? "text-cyan-700 hover:text-cyan-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          &copy; {new Date().getFullYear()} Promisify Team. All rights reserved.
        </a>
      </footer>
    </div>
  );
}
