import axios from "axios";

// default api axios instance
function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { apiInstance };
