import express from "express";

const app = express();
app.use(express.json());

app.post("/callback", (req, res) => {
  console.log("Incoming:", req.body);
  if (req.body?.seatalk_challenge) {
    res.send(req.body.seatalk_challenge);
  } else {
    res.status(400).send("Missing seatalk_challenge");
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
