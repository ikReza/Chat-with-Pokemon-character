const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

const {
  registerValidation,
  loginValidation,
} = require("../validation/userValidation");

router.get("/", async (req, res) => {
  try {
    const existingUser = await User.find();
    res.status(200).send(existingUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/register", async (req, res) => {
  //check if data is valid
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check email
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    birthday: req.body.birthday,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  //check error
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check username exists or not
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username!");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password!");

  res.status(200).send("Logged in!");
  // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
  //   expiresIn: 60,
  // });
  // res.header("auth-token", token).send(token);
});

module.exports = router;
