import { create } from "zustand";

const enchantaStore = create((set) => ({
  authenticated: {
    token: "",
    isAuthenticated: false,
  },
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
  authenticate: (token) =>
    set({ authenticated: { token, isAuthenticated: true } }),
  user: {
    name: "",
  },
  error: "",
  success: "",
}));

export default enchantaStore;
