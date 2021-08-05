const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const yenv = require("yenv");
const env = yenv("app.yaml", { env: "env_variables" });
const { initialDb } = require("./config/db.connect");
const videos = require("./routes/videos.routes");
const users = require("./routes/users.routes");
const playlists = require("./routes/playlists.routes");
app.use(bodyParser.json());
app.use(cors());

initialDb();

const PORT = 8080;

app.use("/videos", videos);
app.use("/users", users);
app.use("/playlists", playlists);
app.get("/", (req, res) => {
  res.send("server is working");
});

app.use((req, res) => {
  res.status(404).json({
    message: "route not found on server, please check",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(503).json({
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
