const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { initialDb } = require("./db/db.connect");
const videos = require("./routes/videos.routes");
const users = require("./routes/users.routes");
const playlists = require("./routes/playlists.routes");
const prefrences = require("./routes/prefrences.routes");
const PORT = 8000;
app.use(bodyParser.json());
app.use(cors());

// initialDb();

app.use("/videos", videos);
app.use("/users", users);
app.use("/playlists", playlists);
app.use("/prefrences", prefrences);
app.get("/", (req, res) => {
  res.send("server is working");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "error occured, see the errMessage key for more details",
    errorMessage: err.message,
  });
});

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
