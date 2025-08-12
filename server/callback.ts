import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  console.log("Received SeaTalk event:", req.body);
  res.status(200).send("OK");
});

export default router;
