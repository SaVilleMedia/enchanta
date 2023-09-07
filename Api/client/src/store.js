import { create } from "zustand";

const enchantaStore = create((set) => ({
  user: {
    name: "",
  },
}));

export default enchantaStore;
