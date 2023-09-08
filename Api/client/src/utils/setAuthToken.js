import axios from "axios";

const setAuthToken = (token) => {
  const localToken = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token || localToken;
    localStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
