// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ButtonForm from "../components/ButtonForm";
// import ButtonList from "../components/ButtonList";
// import {
//   FaSignOutAlt,
//   FaUserCog,
//   FaCloudUploadAlt,
//   FaRegListAlt,
// } from "react-icons/fa";

// const API_URL = "http://localhost:3001/api/buttons";

// export default function Dashboard() {
//   const [buttons, setButtons] = useState([]);
//   const [editingButton, setEditingButton] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [orderDirty, setOrderDirty] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   // ...existing code...
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("isAdmin") !== "true") {
//       navigate("/login");
//     }
//     fetchButtons();
//     // ...existing code...
//   }, [navigate]);

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

//   const handleReorder = async (newList) => {
//     // update local order and persist immediately so reload keeps order
//     setButtons(newList);
//     console.log(
//       "handleReorder: new order ids:",
//       newList.map((b) => b.id)
//     );
//     try {
//       const res = await fetch(`${API_URL}/reorder`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newList),
//       });
//       console.log("reorder request sent, status:", res.status);
//       if (!res.ok) throw new Error();
//       const saved = await res.json();
//       console.log(
//         "reorder response:",
//         saved.map((b) => b.id)
//       );
//       if (Array.isArray(saved)) setButtons(saved);
//       setOrderDirty(false);
//       setSaveSuccess(true);
//       setTimeout(() => setSaveSuccess(false), 2000);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to save order");
//       setOrderDirty(true);
//       // keep local newList for user, but refetch to recover
//       await fetchButtons();
//     }
//   };

//   // persist current buttons order to server
//   const saveOrder = async () => {
//     try {
//       const res = await fetch(`${API_URL}/reorder`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(buttons),
//       });
//       if (!res.ok) throw new Error();
//       // server returns the saved array; use it to sync UI
//       const saved = await res.json();
//       if (Array.isArray(saved)) {
//         setButtons(saved);
//         console.log(
//           "Order saved on server, ids:",
//           saved.map((b) => b.id)
//         );
//       } else {
//         // fallback: refetch
//         await fetchButtons();
//       }
//       setOrderDirty(false);
//       setError("");
//       setSaveSuccess(true);
//       setTimeout(() => setSaveSuccess(false), 3000);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to save order");
//       await fetchButtons();
//     }
//   };

//   const cancelOrderChanges = async () => {
//     // revert local changes by refetching server state
//     await fetchButtons();
//     setOrderDirty(false);
//   };

//   const handleMove = async ({ id, from, to }) => {
//     try {
//       console.log("handleMove: ", { id, from, to });
//       const res = await fetch(`${API_URL}/move`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, from, to }),
//       });
//       console.log("move request sent, status:", res.status);
//       if (!res.ok) throw new Error();
//       const updated = await res.json();
//       console.log(
//         "move response ids:",
//         Array.isArray(updated) ? updated.map((b) => b.id) : updated
//       );
//       if (Array.isArray(updated)) setButtons(updated);
//       setOrderDirty(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to move item");
//       await fetchButtons();
//     }
//   };

//   const handleSave = async (formData) => {
//     try {
//       let res;
//       if (editingButton) {
//         // Edit mode: use PUT
//         res = await fetch(`${API_URL}/${editingButton.id}`, {
//           method: "PUT",
//           body: formData, // FormData will set the correct content-type
//         });
//       } else {
//         // Add mode: use POST
//         console.log("Sending POST request to:", API_URL);
//         res = await fetch(API_URL, {
//           method: "POST",
//           body: formData,
//         });
//       }

//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("Server error:", errorData);
//         throw new Error(errorData.error || "Failed to save button");
//       }

//       const result = await res.json();
//       console.log("Save successful:", result);
//       await fetchButtons();
//       setEditingButton(null);
//     } catch (err) {
//       console.error("Error saving button:", err);
//       setError(err.message || "Failed to save button");
//     }
//   };

//   const handleEdit = (btn) => setEditingButton(btn);

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error();
//       await fetchButtons();
//       setEditingButton(null);
//     } catch {
//       setError("Failed to delete button");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isAdmin");
//     navigate("/login");
//   };

//   // Detect theme from body class
//   const [theme, setTheme] = useState(document.body.className || "light");
//   useEffect(() => {
//     const observer = new window.MutationObserver(() => {
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
//       className={`min-h-screen p-4 transition-colors duration-500 ${
//         theme === "dark"
//           ? "bg-gradient-to-br from-[#18191a] via-[#232526] to-[#434343]"
//           : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
//       }`}
//     >
//       <div className="max-w-3xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1
//             className={`flex items-center gap-2 text-3xl font-extrabold tracking-tight drop-shadow-lg ${
//               theme === "dark" ? "text-cyan-200" : "text-gray-800"
//             }`}
//           >
//             <FaUserCog className="inline mb-1" /> Admin Dashboard
//           </h1>
//           {saveSuccess && (
//             <div className="ml-4 text-sm text-green-600 font-semibold">
//               Order saved
//             </div>
//           )}
//           <button
//             onClick={handleLogout}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 ${
//               theme === "dark"
//                 ? "bg-[#232526] text-cyan-200 hover:bg-[#2c3e50]"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>
//         <div className="mb-8 flex flex-col items-center">
//           <img
//             src="/logo.png"
//             alt="Logo"
//             className={`w-24 h-24 mb-2 rounded-full shadow-2xl border-4 ${
//               theme === "dark" ? "border-gray-700" : "border-white"
//             }`}
//           />
//         </div>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <div
//           className={`rounded-2xl shadow-xl p-6 mb-8 ${
//             theme === "dark" ? "bg-[#232526]" : "bg-white"
//           }`}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h2
//               className={`flex items-center gap-2 text-xl font-bold ${
//                 theme === "dark" ? "text-cyan-200" : "text-blue-700"
//               }`}
//             >
//               <FaRegListAlt /> Manage Buttons
//             </h2>
//             <div className="flex gap-2">
//               {orderDirty && (
//                 <>
//                   <button
//                     onClick={saveOrder}
//                     className="px-3 py-1 rounded-lg bg-green-600 text-white font-semibold"
//                   >
//                     Save Order
//                   </button>
//                   <button
//                     onClick={cancelOrderChanges}
//                     className="px-3 py-1 rounded-lg bg-gray-300 text-gray-800 font-semibold"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//           <ButtonForm onSave={handleSave} editingButton={editingButton} />
//         </div>
//         {loading ? (
//           <div
//             className={`text-center mt-6 ${
//               theme === "dark" ? "text-cyan-200" : "text-gray-500"
//             }`}
//           >
//             Loading...
//           </div>
//         ) : (
//           <div
//             className={`rounded-2xl shadow-xl p-6 ${
//               theme === "dark" ? "bg-[#232526]" : "bg-white"
//             }`}
//           >
//             <ButtonList
//               buttons={buttons}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onReorder={handleReorder}
//               onMove={handleMove}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonForm from "../components/ButtonForm";
import ButtonList from "../components/ButtonList";
import {
  FaSignOutAlt,
  FaUserCog,
  FaCloudUploadAlt,
  FaRegListAlt,
} from "react-icons/fa";

const API_URL = "http://localhost:3001/api/buttons";
const UPLOAD_URL = "http://localhost:3001/api/upload";

export default function Dashboard() {
  const [buttons, setButtons] = useState([]);
  const [editingButton, setEditingButton] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderDirty, setOrderDirty] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/login");
    }
    fetchButtons();
  }, [navigate]);

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

  const handleReorder = async (newList) => {
    setButtons(newList);
    console.log(
      "handleReorder: new order ids:",
      newList.map((b) => b.id)
    );
    try {
      const res = await fetch(`${API_URL}/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newList),
      });
      console.log("reorder request sent, status:", res.status);
      if (!res.ok) throw new Error();
      const saved = await res.json();
      console.log(
        "reorder response:",
        saved.map((b) => b.id)
      );
      if (Array.isArray(saved)) setButtons(saved);
      setOrderDirty(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to save order");
      setOrderDirty(true);
      await fetchButtons();
    }
  };

  const saveOrder = async () => {
    try {
      const res = await fetch(`${API_URL}/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buttons),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      if (Array.isArray(saved)) {
        setButtons(saved);
        console.log(
          "Order saved on server, ids:",
          saved.map((b) => b.id)
        );
      } else {
        await fetchButtons();
      }
      setOrderDirty(false);
      setError("");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to save order");
      await fetchButtons();
    }
  };

  const cancelOrderChanges = async () => {
    await fetchButtons();
    setOrderDirty(false);
  };

  const handleMove = async ({ id, from, to }) => {
    try {
      console.log("handleMove: ", { id, from, to });
      const res = await fetch(`${API_URL}/move`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, from, to }),
      });
      console.log("move request sent, status:", res.status);
      if (!res.ok) throw new Error();
      const updated = await res.json();
      console.log(
        "move response ids:",
        Array.isArray(updated) ? updated.map((b) => b.id) : updated
      );
      if (Array.isArray(updated)) setButtons(updated);
      setOrderDirty(false);
    } catch (err) {
      console.error(err);
      setError("Failed to move item");
      await fetchButtons();
    }
  };

  const handleSave = async (formData) => {
    try {
      let imageUrl = editingButton?.imageUrl || null;
      const imageFile = formData.get("image");

      if (imageFile && imageFile.name) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", imageFile);
        const uploadRes = await fetch(UPLOAD_URL, {
          method: "POST",
          body: uploadFormData,
        });
        if (!uploadRes.ok) {
          const errorData = await uploadRes.json();
          throw new Error(errorData.error || "Failed to upload image");
        }
        const uploadResult = await uploadRes.json();
        imageUrl = uploadResult.imageUrl;
      }

      const buttonData = {
        name: formData.get("name"),
        link: formData.get("link"),
        imageUrl: imageUrl,
      };

      let res;
      if (editingButton) {
        res = await fetch(`${API_URL}/${editingButton.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buttonData),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buttonData),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error || "Failed to save button");
      }

      const result = await res.json();
      console.log("Save successful:", result);
      await fetchButtons();
      setEditingButton(null);
    } catch (err) {
      console.error("Error saving button:", err);
      setError(err.message || "Failed to save button");
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

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

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
          {saveSuccess && (
            <div className="ml-4 text-sm text-green-600 font-semibold">
              Order saved
            </div>
          )}
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
          <img
            src="/logo.png"
            alt="Logo"
            className={`w-24 h-24 mb-2 rounded-full shadow-2xl border-4 ${
              theme === "dark" ? "border-gray-700" : "border-white"
            }`}
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div
          className={`rounded-2xl shadow-xl p-6 mb-8 ${
            theme === "dark" ? "bg-[#232526]" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`flex items-center gap-2 text-xl font-bold ${
                theme === "dark" ? "text-cyan-200" : "text-blue-700"
              }`}
            >
              <FaRegListAlt /> Manage Buttons
            </h2>
            <div className="flex gap-2">
              {orderDirty && (
                <>
                  <button
                    onClick={saveOrder}
                    className="px-3 py-1 rounded-lg bg-green-600 text-white font-semibold"
                  >
                    Save Order
                  </button>
                  <button
                    onClick={cancelOrderChanges}
                    className="px-3 py-1 rounded-lg bg-gray-300 text-gray-800 font-semibold"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
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
              onReorder={handleReorder}
              onMove={handleMove}
            />
          </div>
        )}
      </div>
    </div>
  );
}
