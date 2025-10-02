import { promises as fs } from "fs";
import path from "path";

const logoPath = path.join(process.cwd(), "server", "logo.png");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const image = await fs.readFile(logoPath);
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.status(200).send(image);
    } catch (err) {
      res.status(404).json({ error: "Logo not found" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
