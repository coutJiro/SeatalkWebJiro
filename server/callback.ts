import { Router } from "express";

const router = Router();

// SeaTalk webhook (POST)
router.post("/", (req, res) => {
  console.log("📩 Received SeaTalk callback:", req.body);

  // Respond quickly so SeaTalk doesn't time out
  res.status(200).send("OK");

  // TODO: Process events here
  // e.g., if (req.body.event === "message") { ... }
});

// Optional: Test GET
router.get("/", (req, res) => {
  res.send("SeaTalk callback endpoint - use POST for webhooks");
});

export default router;
