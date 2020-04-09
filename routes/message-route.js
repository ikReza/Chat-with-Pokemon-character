const express = require("express");
const router = express.Router();

const Message = require("../models/message-model");

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/add", async (req, res) => {
  const text = new Message({
    message: req.body.message,
  });

  try {
    const savedMessage = await text.save();
    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
