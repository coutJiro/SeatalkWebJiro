import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import callback from "./callback";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Mount API routes
app.use("/api", routes);

// Mount SeaTalk callback route
app.use("/callback", callback);

// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
