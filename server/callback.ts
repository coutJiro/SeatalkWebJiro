import { Router } from "express";

const router = Router();

// SeaTalk webhook POST
router.post("/", (req, res) => {
  console.log("📩 Received SeaTalk callback:", req.body);

  // Respond quickly so SeaTalk doesn't time out
  res.status(200).send("OK");

  // TODO: Add bot logic here
});

// Optional GET for debugging
router.get("/", (req, res) => {
  res.send("SeaTalk callback endpoint - use POST for events");
});

export default router;
