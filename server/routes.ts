import { Router } from "express";

const router = Router();

// Example API GET
router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Example API POST
router.post("/echo", (req, res) => {
  res.json({ youSent: req.body });
});

export default router;
