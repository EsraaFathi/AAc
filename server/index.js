const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 4000;
const DATA_PATH = path.join(__dirname, "data.json");
const upload = multer({ dest: path.join(__dirname, "uploads/") });

app.use(cors());
app.use(express.json());

// Get all buttons
app.get("/api/buttons", (req, res) => {
  fs.readFile(DATA_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });
    res.json(JSON.parse(data));
  });
});

// Add or update a button
app.post("/api/buttons", (req, res) => {
  const button = req.body;
  fs.readFile(DATA_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });
    let buttons = JSON.parse(data);
    const idx = buttons.findIndex((b) => b.id === button.id);
    if (idx > -1) {
      buttons[idx] = button;
    } else {
      buttons.push(button);
    }
    fs.writeFile(DATA_PATH, JSON.stringify(buttons, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to write data" });
      res.json(button);
    });
  });
});

// Delete a button
app.delete("/api/buttons/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile(DATA_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });
    let buttons = JSON.parse(data);
    buttons = buttons.filter((b) => String(b.id) !== String(id));
    fs.writeFile(DATA_PATH, JSON.stringify(buttons, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to write data" });
      res.json({ success: true });
    });
  });
});

// Serve logo file
app.get("/api/logo", (req, res) => {
  const logoPath = path.join(__dirname, "logo.png");
  if (fs.existsSync(logoPath)) {
    res.sendFile(logoPath);
  } else {
    res.status(404).send("Logo not found");
  }
});

// Upload logo file
app.post(
  "/api/logo",
  express.raw({ type: "image/*", limit: "5mb" }),
  (req, res) => {
    const logoPath = path.join(__dirname, "logo.png");
    fs.writeFile(logoPath, req.body, (err) => {
      if (err) return res.status(500).json({ error: "Failed to save logo" });
      res.json({ success: true });
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
