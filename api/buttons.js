import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "api", "data.json");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await fs.readFile(dataFile, "utf-8");
      res.status(200).json(JSON.parse(data));
    } catch (err) {
      res.status(500).json({ error: "Failed to read data" });
    }
  } else if (req.method === "POST") {
    try {
      const body = req.body;
      const data = await fs.readFile(dataFile, "utf-8");
      const arr = JSON.parse(data);
      arr.push(body);
      await fs.writeFile(dataFile, JSON.stringify(arr, null, 2));
      res.status(201).json(body);
    } catch (err) {
      res.status(500).json({ error: "Failed to save data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
