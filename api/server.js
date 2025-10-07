// import express from "express";
// import cors from "cors";
// import path from "path";
// import { promises as fs } from "fs";
// import { fileURLToPath } from "url";

// const app = express();
// const PORT = process.env.PORT || 3001;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const dataFile = path.join(__dirname, "data.json");

// app.use(cors());
// app.use(express.json());

// // Get all buttons
// app.get("/api/buttons", async (req, res) => {
//   try {
//     const data = await fs.readFile(dataFile, "utf-8");
//     const arr = JSON.parse(data);
//     // if items have explicit order, return sorted by it for deterministic ordering
//     if (Array.isArray(arr) && arr.every((it) => typeof it.order === "number")) {
//       arr.sort((a, b) => a.order - b.order);
//     }
//     res.status(200).json(arr);
//   } catch {
//     res.status(500).json({ error: "Failed to read data" });
//   }
// });

// // Add a new button
// app.post("/api/buttons", async (req, res) => {
//   try {
//     const body = req.body;
//     const data = await fs.readFile(dataFile, "utf-8");
//     const arr = JSON.parse(data);
//     // assign order index for new item
//     body.order = arr.length;
//     arr.push(body);
//     await fs.writeFile(dataFile, JSON.stringify(arr, null, 2));
//     res.status(201).json(body);
//   } catch {
//     res.status(500).json({ error: "Failed to save data" });
//   }
// });

// // Edit a button
// app.put("/api/buttons/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const body = req.body;
//     const data = await fs.readFile(dataFile, "utf-8");
//     let arr = JSON.parse(data);
//     arr = arr.map((btn) =>
//       String(btn.id) === String(id)
//         ? { ...btn, ...body, order: btn.order ?? body.order }
//         : btn
//     );
//     await fs.writeFile(dataFile, JSON.stringify(arr, null, 2));
//     res.status(200).json({ success: true });
//   } catch {
//     res.status(500).json({ error: "Failed to update data" });
//   }
// });

// // Delete a button
// app.delete("/api/buttons/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = await fs.readFile(dataFile, "utf-8");
//     let arr = JSON.parse(data);
//     arr = arr.filter((btn) => String(btn.id) !== String(id));
//     // reindex order
//     arr = arr.map((b, i) => ({ ...b, order: i }));
//     await fs.writeFile(dataFile, JSON.stringify(arr, null, 2));
//     res.status(200).json({ success: true });
//   } catch {
//     res.status(500).json({ error: "Failed to delete data" });
//   }
// });

// // Reorder buttons (accepts full array)
// app.put("/api/buttons/reorder", async (req, res) => {
//   try {
//     const arr = req.body;
//     console.log(
//       "Received /reorder payload ids:",
//       Array.isArray(arr) ? arr.map((b) => b.id) : arr
//     );
//     if (!Array.isArray(arr)) {
//       return res.status(400).json({ error: "Invalid payload" });
//     }
//     // ensure order indices
//     const updated = arr.map((b, i) => ({ ...b, order: i }));
//     await fs.writeFile(dataFile, JSON.stringify(updated, null, 2));
//     console.log(
//       "Reorder saved: ",
//       updated.map((b) => b.id)
//     );
//     res.status(200).json(updated);
//   } catch {
//     res.status(500).json({ error: "Failed to reorder data" });
//   }
// });

// // Move single button from one index to another and update order fields
// app.put("/api/buttons/move", async (req, res) => {
//   try {
//     const { id, from, to } = req.body || {};
//     console.log("Received /move payload:", req.body);
//     if (
//       typeof id === "undefined" ||
//       typeof from !== "number" ||
//       typeof to !== "number"
//     ) {
//       console.error("Invalid move payload:", req.body);
//       return res.status(400).json({ error: "Invalid payload" });
//     }
//     const data = await fs.readFile(dataFile, "utf-8");
//     const arr = JSON.parse(data);
//     // validate indices
//     if (from < 0 || from >= arr.length || to < 0 || to > arr.length) {
//       console.error("Invalid from/to indices", { from, to, len: arr.length });
//       return res.status(400).json({ error: "Invalid indices" });
//     }
//     // ensure the id at 'from' matches the provided id (optional sanity check)
//     if (String(arr[from].id) !== String(id)) {
//       console.warn("ID at 'from' does not match payload id", {
//         expected: arr[from].id,
//         got: id,
//       });
//       // try to find the actual index by id as fallback
//       const found = arr.findIndex((b) => String(b.id) === String(id));
//       if (found === -1) return res.status(404).json({ error: "Not found" });
//       // use found index instead
//       console.log("Using found index", found);
//       const [moved] = arr.splice(found, 1);
//       arr.splice(to, 0, moved);
//     } else {
//       // remove and insert using provided 'from' and 'to'
//       const [moved] = arr.splice(from, 1);
//       arr.splice(to, 0, moved);
//     }
//     // update order index on each item
//     const updated = arr.map((b, i) => ({ ...b, order: i }));
//     await fs.writeFile(dataFile, JSON.stringify(updated, null, 2));
//     console.log("Moved", id, "from", from, "to", to, "saved to data.json");
//     res.status(200).json(updated);
//   } catch (err) {
//     console.error("Error in /api/buttons/move", err);
//     res.status(500).json({ error: "Failed to move item" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

// Get all buttons
app.get("/api/buttons", async (req, res) => {
  try {
    const data = await fs.readFile(dataFile, "utf-8");
    const arr = JSON.parse(data);
    // if items have explicit order, return sorted by it for deterministic ordering
    if (Array.isArray(arr) && arr.every((it) => typeof it.order === "number")) {
      arr.sort((a, b) => a.order - b.order);
    }
    res.status(200).json(arr);
  } catch {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// Add a new button
app.post("/api/buttons", async (req, res) => {
  try {
    const body = req.body;
    const data = await fs.readFile(dataFile, "utf-8");
    const arr = JSON.parse(data);
    // assign order index for new item
    body.order = arr.length;
    arr.push(body);
    await fs.writeFile(dataFile, JSON.stringify(arr, null, 2));
    res.status(201).json(body);
  } catch {
    res.status(500).json({ error: "Failed to save data" });
  }
});

// IMPORTANT: Put specific routes BEFORE parameterized routes
// Reorder buttons (accepts full array)
app.put("/api/buttons/reorder", async (req, res) => {
  try {
    const arr = req.body;
    console.log(
      "Received /reorder payload ids:",
      Array.isArray(arr) ? arr.map((b) => b.id) : arr
    );
    if (!Array.isArray(arr)) {
      return res.status(400).json({ error: "Invalid payload" });
    }
    // ensure order indices
    const updated = arr.map((b, i) => ({ ...b, order: i }));
    await fs.writeFile(dataFile, JSON.stringify(updated, null, 2));
    console.log(
      "Reorder saved: ",
      updated.map((b) => b.id)
    );
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: "Failed to reorder data" });
  }
});

// Move single button from one index to another and update order fields
app.put("/api/buttons/move", async (req, res) => {
  try {
    const { id, from, to } = req.body || {};
    console.log("Received /move payload:", req.body);
    if (
      typeof id === "undefined" ||
      typeof from !== "number" ||
      typeof to !== "number"
    ) {
      console.error("Invalid move payload:", req.body);
      return res.status(400).json({ error: "Invalid payload" });
    }
    const data = await fs.readFile(dataFile, "utf-8");
    const arr = JSON.parse(data);
    // validate indices
    if (from < 0 || from >= arr.length || to < 0 || to > arr.length) {
      console.error("Invalid from/to indices", { from, to, len: arr.length });
      return res.status(400).json({ error: "Invalid indices" });
    }
    // ensure the id at 'from' matches the provided id (optional sanity check)
    if (String(arr[from].id) !== String(id)) {
      console.warn("ID at 'from' does not match payload id", {
        expected: arr[from].id,
        got: id,
      });
      // try to find the actual index by id as fallback
      const found = arr.findIndex((b) => String(b.id) === String(id));
      if (found === -1) return res.status(404).json({ error: "Not found" });
      // use found index instead
      console.log("Using found index", found);
      const [moved] = arr.splice(found, 1);
      arr.splice(to, 0, moved);
    } else {
      // remove and insert using provided 'from' and 'to'
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
    }
    // update order index on each item
    const updated = arr.map((b, i) => ({ ...b, order: i }));
    await fs.writeFile(dataFile, JSON.stringify(updated, null, 2));
    console.log("Moved", id, "from", from, "to", to, "saved to data.json");
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error in /api/buttons/move", err);
    res.status(500).json({ error: "Failed to move item" });
  }
});

// Edit a button - PUT THIS AFTER THE SPECIFIC ROUTES
app.put("/api/buttons/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await fs.readFile(dataFile, "utf-8");
    let arr = JSON.parse(data);
    arr = arr.map((btn) =>
      String(btn.id) === String(id)
        ? { ...btn, ...body, order: btn.order ?? body.order }
        : btn
    );
    await fs.writeFile(dataFile, JSON.stringify(arr, null, 2));
    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to update data" });
  }
});

// Delete a button
app.delete("/api/buttons/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile(dataFile, "utf-8");
    let arr = JSON.parse(data);
    arr = arr.filter((btn) => String(btn.id) !== String(id));
    // reindex order
    arr = arr.map((b, i) => ({ ...b, order: i }));
    await fs.writeFile(dataFile, JSON.stringify(arr, null, 2));
    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
