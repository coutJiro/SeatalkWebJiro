import express from "express";
import bodyParser from "body-parser";
import callbackRouter from "./callback";
import routes from "./routes";

const app = express();
app.use(bodyParser.json());

// SeaTalk callback
app.use("/callback", callbackRouter);

// Your normal API routes
app.use("/api", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
