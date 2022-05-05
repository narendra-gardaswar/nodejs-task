const mongoose = require("mongoose");
require("dotenv").config();

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
