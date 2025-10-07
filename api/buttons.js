// import { promises as fs } from "fs";
// import path from "path";
// import multer from "multer";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Configure multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: async function (req, file, cb) {
//     try {
//       // Make sure the uploads directory exists
//       const uploadsDir = path.join(__dirname, "..", "public", "uploads");
//       await fs.mkdir(uploadsDir, { recursive: true });
//       cb(null, uploadsDir);
//     } catch (err) {
//       console.error("Error creating uploads directory:", err);
//       cb(err);
//     }
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {
//       return cb(new Error("Only images are allowed"));
//     }
//     cb(null, true);
//   },
// }).single("image");

// const dataFile = path.join(__dirname, "data.json");

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       const data = await fs.readFile(dataFile, "utf-8");
//       res.status(200).json(JSON.parse(data));
//     } catch (error) {
//       console.error("Error reading data:", error);
//       res.status(500).json({ error: "Failed to read data" });
//     }
//   } else if (req.method === "POST") {
//     upload(req, res, async (error) => {
//       if (error instanceof multer.MulterError) {
//         console.error("Multer error:", error);
//         return res
//           .status(400)
//           .json({ error: "File upload error: " + error.message });
//       } else if (error) {
//         console.error("Unknown upload error:", error);
//         return res
//           .status(500)
//           .json({ error: "Unknown error: " + error.message });
//       }

//       try {
//         if (!req.body.data) {
//           console.error("No data field in request body");
//           return res
//             .status(400)
//             .json({ error: "Missing data field in request" });
//         }

//         const buttonData = JSON.parse(req.body.data);
//         console.log("Received button data:", buttonData);
//         const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
//         if (req.file) {
//           console.log("Image uploaded:", req.file.filename);
//         }

//         const data = await fs.readFile(dataFile, "utf-8");
//         const arr = JSON.parse(data);

//         const newButton = {
//           ...buttonData,
//           image: imagePath,
//         };

//         arr.push(newButton);
//         await fs.writeFile(dataFile, JSON.stringify(arr, null, 2));
//         res.status(201).json(newButton);
//       } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ error: "Failed to save data" });
//       }
//     });
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
import { promises as fs } from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      // Make sure the uploads directory exists
      const uploadsDir = path.join(__dirname, "..", "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });
      cb(null, uploadsDir);
    } catch (err) {
      console.error("Error creating uploads directory:", err);
      cb(err);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
}).single("image");

const dataFile = path.join(__dirname, "data.json");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await fs.readFile(dataFile, "utf-8");
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      console.error("Error reading data:", error);
      res.status(500).json({ error: "Failed to read data" });
    }
  } else if (req.method === "POST") {
    upload(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        console.error("Multer error:", error);
        return res
          .status(400)
          .json({ error: "File upload error: " + error.message });
      } else if (error) {
        console.error("Unknown upload error:", error);
        return res
          .status(500)
          .json({ error: "Unknown error: " + error.message });
      }

      try {
        if (!req.body.data) {
          console.error("No data field in request body");
          return res
            .status(400)
            .json({ error: "Missing data field in request" });
        }

        const buttonData = JSON.parse(req.body.data);
        console.log("Received button data:", buttonData);
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        if (req.file) {
          console.log("Image uploaded:", req.file.filename);
        }

        const data = await fs.readFile(dataFile, "utf-8");
        const arr = JSON.parse(data);

        const newButton = {
          ...buttonData,
          image: imagePath,
        };

        arr.push(newButton);
        await fs.writeFile(dataFile, JSON.stringify(arr, null, 2));
        res.status(201).json(newButton);
      } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: "Failed to save data" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
