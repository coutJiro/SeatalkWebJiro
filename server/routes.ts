import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /callback: handle SeaTalk webhook and verification challenge
  app.post("/callback", (req, res) => {
    console.log("Received /callback POST:", req.body);

    res.setHeader("Content-Type", "application/json");

    try {
      const data = req.body;

      // Check if this is the verification request from SeaTalk
      if (data?.event?.seatalk_challenge) {
        const challenge = data.event.seatalk_challenge;
        console.log("Responding with seatalk_challenge:", challenge);
        // Respond with the challenge value exactly as required
        res.status(200).json({ seatalk_challenge: challenge });
        return;
      }

      // For other event callbacks, you can handle them here
      // For now, just respond OK
      res.status(200).json({ status: "ok" });
    } catch (error) {
      console.error("Error handling /callback:", error);
      res.status(400).json({ error: "Invalid JSON" });
    }
  });

  // GET /callback: simple test endpoint to check server is alive
  app.get("/callback", (_req, res) => {
    res.status(200).send("Callback endpoint is alive (GET)");
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.status(200).json({
      status: "online",
      timestamp: new Date().toISOString(),
      endpoint: "/callback",
    });
  });

  // Create HTTP server for app and return it
  const httpServer = createServer(app);
  return httpServer;
}
