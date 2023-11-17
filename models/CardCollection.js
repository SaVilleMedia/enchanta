const mongoose = require("mongoose");

const CardCollectionSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  cardCollection: {
    type: Array,
  },
});

module.exports = CardCollection = mongoose.model(
  "cardCollection",
  CardCollectionSchema
);
