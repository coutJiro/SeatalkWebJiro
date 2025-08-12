import express from "express";
import routes from "./routes";

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Mount all routes
app.use("/", routes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
