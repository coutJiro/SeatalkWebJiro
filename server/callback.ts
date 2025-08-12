import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  console.log("Incoming from SeaTalk:", req.body);

  // Verification step
  if (req.body?.seatalk_challenge) {
    // Respond with the challenge string exactly as-is
    return res.status(200).send(req.body.seatalk_challenge);
  }

  // Normal message handling
  res.status(200).send("OK");
});

export default router;
