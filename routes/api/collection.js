const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const CardCollection = require("../../models/CardCollection");

// @route   POST api/user/card-collection
// @desc    Register Card Collection
// @access  Public

router.post("/", auth, async (req, res) => {
  try {
    const card = req.body;
    const userId = req.user.id;
    const user = await CardCollection.findOne({ userId });

    card["id"] = card.card.id;

    if (user) {
      const existingCardIndex = user.cardCollection.findIndex(
        (c) => c.id === card.id
      );

      if (existingCardIndex !== -1) {
        console.log("updating existing card");
        user.cardCollection[existingCardIndex].amount += 1;
        await user.save();
        return res.json(user.cardCollection);
      } else {
        console.log("adding new card");
        user.cardCollection = [...user.cardCollection, card];
        await user.save();
        return res.json(user.cardCollection);
      }
    }

    const newCardCollection = new CardCollection({
      userId,
      card,
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

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const cardCollection = await CardCollection.findOne({ userId });
    if (!cardCollection) {
      return res.status(400).json({ msg: "No card collection found" });
    }

    return res.json(cardCollection.cardCollection);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "User Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/user/card-collection/:cardId
// @desc    Delete Card Collection
// @access  Public

router.delete("/:cardId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cardId = req.params.cardId;

    // Find the card collection for the user
    const cardCollection = await CardCollection.findOne({ userId });

    if (!cardCollection) {
      return res.status(404).json({ msg: "No card collection found" });
    }

    // Filter out the card with the specified ID
    cardCollection.cardCollection = cardCollection.cardCollection.filter(
      (card) => card.card.id !== cardId
    );

    // Save the updated card collection
    await cardCollection.save();

    return res.json(cardCollection.cardCollection);
  } catch (err) {
    console.error("Error in deleting card:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
