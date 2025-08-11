import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // SeaTalk webhook callback endpoint (POST)
  app.post("/callback", (req, res) => {
    // Always respond with JSON
    res.setHeader("Content-Type", "application/json");
    
    try {
      const data = req.body;
      
      // Check if seatalk_challenge exists in event
      if (data?.event?.seatalk_challenge) {
        const challenge = data.event.seatalk_challenge;
        
        // Respond with the challenge in JSON format
        res.status(200).json({
          seatalk_challenge: challenge
        });
        return;
      }
      
      // If not a verification request, handle other events here
      res.status(200).json({ status: "ok" });
      
    } catch (error) {
      // Handle any JSON parsing errors
      res.status(400).json({ error: "Invalid JSON" });
    }
  });

  // NEW: Allow browser testing for GET /callback
  app.get("/callback", (_req, res) => {
    res.status(200).send("Callback endpoint is alive (GET)");
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ 
      status: "online",
      timestamp: new Date().toISOString(),
      endpoint: "/callback"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
