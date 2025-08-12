import { Router } from "express";

const router = Router();

// Handle SeaTalk webhook
router.post("/", (req, res) => {
  console.log("📩 Received POST /callback:", req.body);

  if (req.body?.seatalk_challenge) {
    // Return the challenge exactly as SeaTalk expects
    res.send(req.body.seatalk_challenge);
  } else {
    res.status(400).send("Missing seatalk_challenge");
  }
});

export default router;
