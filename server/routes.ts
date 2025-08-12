import { Router } from "express";
import crypto from "crypto";

const router = Router();

const APP_ID = process.env.SEATALK_APP_ID || "your-app-id";
const APP_SECRET = process.env.SEATALK_APP_SECRET || "your-app-secret";

// Helper: verify SeaTalk signature (if needed)
function verifySignature(signature: string, timestamp: string, nonce: string, body: string) {
  const data = `${APP_SECRET}${timestamp}${nonce}${body}`;
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  return hash === signature;
}

router.post("/", (req, res) => {
  const signature = req.headers["x-seatalk-signature"] as string;
  const timestamp = req.headers["x-seatalk-timestamp"] as string;
  const nonce = req.headers["x-seatalk-nonce"] as string;
  const bodyString = JSON.stringify(req.body);

  // Optional: check signature
  if (!verifySignature(signature, timestamp, nonce, bodyString)) {
    return res.status(403).send("Invalid signature");
  }

  console.log("SeaTalk Event Received:", req.body);

  // Example: respond to verification challenge
  if (req.body?.type === "url_verification") {
    return res.send(req.body.challenge);
  }

  // Example: handle message received event
  if (req.body?.type === "message_received") {
    console.log("Message text:", req.body?.message?.text);
    // Here: send reply to user via SeaTalk API
  }

  res.send("ok");
});

export default router;
