// // import React, { useState, useEffect } from "react";
// // import { FaPlus, FaEdit, FaImage } from "react-icons/fa";

// // export default function ButtonForm({ onSave, editingButton }) {
// //   const [name, setName] = useState(editingButton ? editingButton.name : "");
// //   const [link, setLink] = useState(editingButton ? editingButton.link : "");
// //   const [image, setImage] = useState(null);
// //   const [previewUrl, setPreviewUrl] = useState(editingButton?.image || "");

// //   useEffect(() => {
// //     setName(editingButton ? editingButton.name : "");
// //     setLink(editingButton ? editingButton.link : "");
// //     setPreviewUrl(editingButton?.image || "");
// //     setImage(null);
// //   }, [editingButton]);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setImage(file);
// //       setPreviewUrl(URL.createObjectURL(file));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!name.trim() || !link.trim()) return;

// //     const formData = new FormData();
// //     if (image) {
// //       formData.append("image", image);
// //     }
// //     formData.append(
// //       "data",
// //       JSON.stringify({
// //         name,
// //         link,
// //         id: editingButton ? editingButton.id : Date.now(),
// //       })
// //     );

// //     try {
// //       onSave(formData);
// //       setName("");
// //       setLink("");
// //       setImage(null);
// //       setPreviewUrl("");
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //     }
// //   };

// //   // Detect theme from body class
// //   const [theme, setTheme] = useState(document.body.className || "light");
// //   useEffect(() => {
// //     const observer = new window.MutationObserver(() => {
// //       setTheme(document.body.className || "light");
// //     });
// //     observer.observe(document.body, {
// //       attributes: true,
// //       attributeFilter: ["class"],
// //     });
// //     return () => observer.disconnect();
// //   }, []);

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className={`flex flex-col gap-4 p-6 rounded-2xl shadow-xl border transition-colors duration-300
// //          ${
// //            theme === "dark"
// //              ? "bg-[#232526] border-[#333]"
// //              : "bg-white border-gray-200"
// //          }`}
// //     >
// //       <div className="relative group">
// //         <input
// //           type="file"
// //           accept="image/*"
// //           onChange={handleImageChange}
// //           className="hidden"
// //           id="imageUpload"
// //         />
// //         <label
// //           htmlFor="imageUpload"
// //           className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all
// //             ${
// //               theme === "dark"
// //                 ? "border-gray-600 hover:border-cyan-400"
// //                 : "border-gray-300 hover:border-blue-400"
// //             }`}
// //         >
// //           {previewUrl ? (
// //             <img
// //               src={previewUrl}
// //               alt="Button preview"
// //               className="h-full w-full object-contain rounded-lg"
// //             />
// //           ) : (
// //             <div className="flex flex-col items-center">
// //               <FaImage
// //                 className={`text-3xl ${
// //                   theme === "dark" ? "text-gray-400" : "text-gray-500"
// //                 }`}
// //               />
// //               <span
// //                 className={`mt-2 text-sm ${
// //                   theme === "dark" ? "text-gray-400" : "text-gray-500"
// //                 }`}
// //               >
// //                 Click to upload image
// //               </span>
// //             </div>
// //           )}
// //         </label>
// //       </div>

// //       <input
// //         type="text"
// //         placeholder="Button Name"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //         className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
// //           theme === "dark"
// //             ? "bg-[#18191a] border-[#444] text-cyan-100 focus:ring-cyan-400 placeholder-gray-500"
// //             : "border-gray-300 focus:ring-blue-400"
// //         }`}
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //         required
// //       />
// //       <input
// //         type="url"
// //         placeholder="Button Link (https://...)"
// //         className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
// //           theme === "dark"
// //             ? "bg-[#18191a] border-[#444] text-cyan-100 focus:ring-cyan-400 placeholder-gray-500"
// //             : "border-gray-300 focus:ring-blue-400"
// //         }`}
// //         value={link}
// //         onChange={(e) => setLink(e.target.value)}
// //         required
// //       />
// //       <button
// //         type="submit"
// //         className={`flex items-center justify-center gap-2 font-semibold py-2 rounded-lg shadow-md transition-all text-lg ${
// //           editingButton
// //             ? theme === "dark"
// //               ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
// //               : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
// //             : theme === "dark"
// //             ? "bg-blue-600 hover:bg-blue-700 text-white"
// //             : "bg-blue-600 hover:bg-blue-700 text-white"
// //         }`}
// //       >
// //         {editingButton ? <FaEdit /> : <FaPlus />}{" "}
// //         {editingButton ? "Update Button" : "Add Button"}
// //       </button>
// //     </form>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { FaPlus, FaEdit, FaImage } from "react-icons/fa";

// export default function ButtonForm({ onSave, editingButton }) {
//   const [name, setName] = useState(editingButton ? editingButton.name : "");
//   const [link, setLink] = useState(editingButton ? editingButton.link : "");
//   const [imageFile, setImageFile] = useState(null); // Changed from 'image' to 'imageFile'
//   const [previewUrl, setPreviewUrl] = useState(editingButton?.imageUrl || ""); // Changed from 'image' to 'imageUrl'

//   useEffect(() => {
//     setName(editingButton ? editingButton.name : "");
//     setLink(editingButton ? editingButton.link : "");
//     setPreviewUrl(editingButton?.imageUrl || ""); // Changed from 'image' to 'imageUrl'
//     setImageFile(null); // Changed from 'image' to 'imageFile'
//   }, [editingButton]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file); // Changed from 'image' to 'imageFile'
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim() || !link.trim()) return;

//     const formData = new FormData();
//     if (imageFile) {
//       // Changed from 'image' to 'imageFile'
//       formData.append("image", imageFile); // Append the image file
//     }
//     formData.append("name", name); // Append name separately
//     formData.append("link", link); // Append link separately
//     if (editingButton) {
//       formData.append("id", editingButton.id); // Append id for editing
//     }

//     try {
//       onSave(formData); // onSave will now handle the formData directly
//       setName("");
//       setLink("");
//       setImageFile(null); // Changed from 'image' to 'imageFile'
//       setPreviewUrl("");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
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
//     <form
//       onSubmit={handleSubmit}
//       className={`flex flex-col gap-4 p-6 rounded-2xl shadow-xl border transition-colors duration-300
//          ${
//            theme === "dark"
//              ? "bg-[#232526] border-[#333]"
//              : "bg-white border-gray-200"
//          }`}
//     >
//       <div className="relative group">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="hidden"
//           id="imageUpload"
//         />
//         <label
//           htmlFor="imageUpload"
//           className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all
//             ${
//               theme === "dark"
//                 ? "border-gray-600 hover:border-cyan-400"
//                 : "border-gray-300 hover:border-blue-400"
//             }`}
//         >
//           {previewUrl ? (
//             <img
//               src={previewUrl}
//               alt="Button preview"
//               className="h-full w-full object-contain rounded-lg"
//             />
//           ) : (
//             <div className="flex flex-col items-center">
//               <FaImage
//                 className={`text-3xl ${
//                   theme === "dark" ? "text-gray-400" : "text-gray-500"
//                 }`}
//               />
//               <span
//                 className={`mt-2 text-sm ${
//                   theme === "dark" ? "text-gray-400" : "text-gray-500"
//                 }`}
//               >
//                 Click to upload image
//               </span>
//             </div>
//           )}
//         </label>
//       </div>

//       <input
//         type="text"
//         placeholder="Button Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
//           theme === "dark"
//             ? "bg-[#18191a] border-[#444] text-cyan-100 focus:ring-cyan-400 placeholder-gray-500"
//             : "border-gray-300 focus:ring-blue-400"
//         }`}
//         required
//       />
//       <input
//         type="url"
//         placeholder="Button Link (https://...)"
//         className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
//           theme === "dark"
//             ? "bg-[#18191a] border-[#444] text-cyan-100 focus:ring-cyan-400 placeholder-gray-500"
//             : "border-gray-300 focus:ring-blue-400"
//         }`}
//         value={link}
//         onChange={(e) => setLink(e.target.value)}
//         required
//       />
//       <button
//         type="submit"
//         className={`flex items-center justify-center gap-2 font-semibold py-2 rounded-lg shadow-md transition-all text-lg ${
//           editingButton
//             ? theme === "dark"
//               ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
//               : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
//             : theme === "dark"
//             ? "bg-blue-600 hover:bg-blue-700 text-white"
//             : "bg-blue-600 hover:bg-blue-700 text-white"
//         }`}
//       >
//         {editingButton ? <FaEdit /> : <FaPlus />}{" "}
//         {editingButton ? "Update Button" : "Add Button"}
//       </button>
//     </form>
//   );
// }

import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaImage } from "react-icons/fa";

export default function ButtonForm({ onSave, editingButton }) {
  const [name, setName] = useState(editingButton ? editingButton.name : "");
  const [link, setLink] = useState(editingButton ? editingButton.link : "");
  const [imageFile, setImageFile] = useState(null); // Changed from 'image' to 'imageFile'
  const [previewUrl, setPreviewUrl] = useState(editingButton?.imageUrl || ""); // Changed from 'image' to 'imageUrl'

  useEffect(() => {
    setName(editingButton ? editingButton.name : "");
    setLink(editingButton ? editingButton.link : "");
    setPreviewUrl(editingButton?.imageUrl || ""); // Changed from 'image' to 'imageUrl'
    setImageFile(null); // Changed from 'image' to 'imageFile'
  }, [editingButton]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Changed from 'image' to 'imageFile'
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !link.trim()) return;

    const formData = new FormData();
    if (imageFile) {
      // Changed from 'image' to 'imageFile'
      formData.append("image", imageFile); // Append the image file
    }
    formData.append("name", name); // Append name separately
    formData.append("link", link); // Append link separately
    if (editingButton) {
      formData.append("id", editingButton.id); // Append id for editing
    }

    try {
      onSave(formData); // onSave will now handle the formData directly
      setName("");
      setLink("");
      setImageFile(null); // Changed from 'image' to 'imageFile'
      setPreviewUrl("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
      className={`flex flex-col gap-4 p-6 rounded-2xl shadow-xl border transition-colors duration-300
         ${
           theme === "dark"
             ? "bg-[#232526] border-[#333]"
             : "bg-white border-gray-200"
         }`}
    >
      <div className="relative group">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all
            ${
              theme === "dark"
                ? "border-gray-600 hover:border-cyan-400"
                : "border-gray-300 hover:border-blue-400"
            }`}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Button preview"
              className="h-full w-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center">
              <FaImage
                className={`text-3xl ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <span
                className={`mt-2 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Click to upload image
              </span>
            </div>
          )}
        </label>
      </div>

      <input
        type="text"
        placeholder="Button Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
          theme === "dark"
            ? "bg-[#18191a] border-[#444] text-cyan-100 focus:ring-cyan-400 placeholder-gray-500"
            : "border-gray-300 focus:ring-blue-400"
        }`}
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
