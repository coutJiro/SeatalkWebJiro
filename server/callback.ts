import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  console.log("Incoming SeaTalk request:", req.body);

  // SeaTalk verification
  if (req.body?.seatalk_challenge) {
    return res.status(200).send(req.body.seatalk_challenge);
  }

  // Handle normal bot events
  res.status(200).send("OK");
});

export default router;
