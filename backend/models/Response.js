const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    unique: true,
  },
  reply: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Response", responseSchema);
