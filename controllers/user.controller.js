const { User } = require("../models/user.model");
const { Playlist } = require("../models/playlist.model");
const { createDefaultPlaylist } = require("../utils/playlist.utils");
const {
  issueJWT,
  generateHash,
  isValidPassword,
  extractProtectedKey,
} = require("../utils/security.utils");
const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    let user = await User.findOne({ email: email });
    if (user) {
      const match = await isValidPassword(password, user.password);
      if (match) {
        const jwt = issueJWT(user._id);
        user = extractProtectedKey(user);
        return res.status(200).json({
          data: { user, token: jwt.token },
        });
      }
    }
    return res.status(422).json({ error: "Invalid Email/Password" });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

const newUser = async (req, res) => {
  try {
    let user = req.body;
    user.email = user.email.toLowerCase();
    const isAlreadyExists = await User.findOne({ email: user.email });
    if (isAlreadyExists) {
      res.status(422).json({ error: "User Already Exists" });
    } else {
      user.password = await generateHash(user.password);
      const NewUser = new User(user);
      const defaultPlaylist = createDefaultPlaylist(NewUser._id);
      await Playlist.insertMany(defaultPlaylist);
      await NewUser.save();
      res.status(201).json({ data: "Sign up Successfully" });
    }
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

const userDetails = (req, res) => {
  try {
    let { user } = req;
    user = extractProtectedKey(user);
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

const changeUsername = async (req, res) => {
  try {
    let { user } = req;
    const { newName } = req.body;
    user.name = newName;
    const updatedUser = await user.save();
    res.status(200).json({ data: "Successfull Update" });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};
const chnagePassword = async (req, res) => {
  try {
    let { user } = req;
    const { oldPassword, newPassword } = req.body;
    const match = await isValidPassword(oldPassword, user.password);
    if (match) {
      user.password = await generateHash(newPassword);
      const updatedUser = await user.save();
      res.status(200).json({ data: "Successfull Update" });
    } else {
      res.status(422).json({ error: "Old password isn't valid" });
    }
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

module.exports = {
  userDetails,
  newUser,
  userLogin,
  changeUsername,
  chnagePassword,
};
