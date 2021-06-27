const mongoose = require("mongoose");
const yenv = require("yenv");
const env = yenv("app.yaml", { env: "env_variables" });
const mySecret = env["DBPASSWORD"];
const initialDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Gagandeep:${mySecret}@videolibaray.licm8.mongodb.net/GreenifyPlay?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { initialDb };
