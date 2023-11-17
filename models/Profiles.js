const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  collection: {
    cards: {
      type: Array,
    },
  },
  decks: {
    name: {
      type: String,
    },
    cards: {
      type: Array,
    },
  },
  friends: {
    type: Array,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
