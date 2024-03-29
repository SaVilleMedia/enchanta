import axios from "axios";
import { create } from "zustand";
import setAuthToken from "./utils/setAuthToken";
import { Api } from "./api";

const allowedSetTypes = ["commander", "expansion"];

const enchantaStore = create((set) => ({
  authenticated: {
    token: localStorage.getItem("token") ?? "",
    isAuthenticated: localStorage.getItem("isAuthenticated") ?? false,
  },
  user: JSON.parse(localStorage.getItem("user")) || {},
  error: "",
  success: "",
  sets: [],
  cards: [],
  setError: (message) => {
    set({
      success: null,
      error: message,
    });
  },
  setSuccess: (message) => {
    set({
      error: null,
      success: message,
    });
  },
  clearErrors: () => {
    set({
      errors: null,
    });
  },
  clearSuccess: () => {
    set({
      success: null,
    });
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ authenticated: { token } });
  },
  loginUser: async (token) => {
    const localToken = localStorage.getItem("token");
    localStorage.setItem("isAuthenticated", true);
    setAuthToken(token || localToken);
    try {
      return await axios.get("/api/auth");
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    const setUser = user || localStorage.getItem("user");
    set({ user: { ...setUser } });
    set({ authenticated: { isAuthenticated: true } });
  },
  logoutUser: () => {
    set({
      authenticated: {
        token: "",
        isAuthenticated: false,
      },
      user: {},
    });
    localStorage.clear();
  },
}));

export default enchantaStore;
