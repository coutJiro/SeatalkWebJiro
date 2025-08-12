import { Router } from "express";

const router = Router();

// Example GET API
router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Example POST API
router.post("/echo", (req, res) => {
  res.json({ youSent: req.body });
});

export default router;
