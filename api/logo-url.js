import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "server", "data.json");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { logoUrl } = req.body;
      if (!logoUrl) {
        return res.status(400).json({ error: "logoUrl is required" });
      }
      // read current data
      let data = {};
      try {
        const file = await fs.readFile(dataFile, "utf-8");
        data = JSON.parse(file);
      } catch {}
      // save logoUrl
      data.logoUrl = logoUrl;
      await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
      res.status(200).json({ success: true, logoUrl });
    } catch (err) {
      res.status(500).json({ error: "Failed to save logoUrl" });
    }
  } else if (req.method === "GET") {
    try {
      const file = await fs.readFile(dataFile, "utf-8");
      const data = JSON.parse(file);
      res.status(200).json({ logoUrl: data.logoUrl || null });
    } catch {
      res.status(200).json({ logoUrl: null });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
