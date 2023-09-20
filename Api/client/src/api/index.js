import axios from "axios";

const baseUrl = "https://api.scryfall.com/";

export const ApiUrls = {
  sets: "sets",
  cards: "cards/search?q=%28game%3Apaper+or+game%3Aarena+or+game%3Amtgo%29",
};

export const Api = {
  getSets: async () => {
    try {
      const response = await axios.get(baseUrl + ApiUrls.sets);
      return await response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
  getCards: async () => {
    try {
      const response = await axios.get(baseUrl + ApiUrls.cards);
      return await response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
};
