import axios from "axios";

const baseUrl = "https://api.scryfall.com/";

export const ApiUrls = {
  collection: "/api/user/card-collection",
};

export const axiosScryfall = axios.create({
  baseURL: baseUrl,
  headers: {
    "x-auth-token": null,
  },
});

export const getCollection = async () => {
  try {
    const response = await axios.get("/api/user/card-collection");
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addToCollection = async (card, selectedFinish, amount) => {
  try {
    const response = await axios.post("/api/user/card-collection", {
      card: { ...card },
      finish: selectedFinish ? selectedFinish : card.finishes[0],
      amount,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
    return err;
  }
};
