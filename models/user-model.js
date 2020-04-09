const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
