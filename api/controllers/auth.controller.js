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

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if(!validUser) {
      return next(errorHandler(404,"User not found"))
    }
    const validPassword = bcrypt.compareSync(password, validUser.password)
    if(!validPassword){
        return next(errorHandler(401,"Wrong Credentials!"));
    }
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
    const {password:pass, ...rest} = validUser._doc;
    res.cookie("token", token, {httpOnly: true}).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
};
