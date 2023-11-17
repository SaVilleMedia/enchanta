const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const CardCollection = require("../../models/CardCollection");

// @route   POST api/user/card-collection
// @desc    Register Card Collection
// @access  Public

router.post("/card-collection", auth, async (req, res) => {
  const card = req.body;
  const userId = req.user.id;
  try {
    const user = await CardCollection.findOne({ userId });

    if (user) {
      user.cardCollection = [...user.cardCollection, card];
      user.save();
      return res.json(user.cardCollection);
    }

    const cardCollection = [card];

    const newCardCollection = new CardCollection({
      userId,
      cardCollection,
    });

    await newCardCollection.save();
    return res.json(newCardCollection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/user/card-collection
// @desc    Get Card Collection
// @access  Public

router.get("/card-collection", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const cardCollection = await CardCollection.findOne({ userId });
    if (!cardCollection) {
      return res.status(404).json({ msg: "No card collection found" });
    }
    return res.status(201).json(cardCollection.cardCollection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
