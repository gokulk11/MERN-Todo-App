const User = require("../models/user.model.js");
const errorHandler = require("../utils/error.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hash = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hash });
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
};
