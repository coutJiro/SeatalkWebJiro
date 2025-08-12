import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import callbackRoute from "./callback";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Normal API routes
app.use("/api", routes);

// SeaTalk callback route — must be directly at /callback
app.use("/callback", callbackRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
