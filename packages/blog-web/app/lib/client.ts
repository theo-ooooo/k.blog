import axios from "axios";

const client = axios.create({
  withCredentials: true,
  baseURL:
    (typeof window === "undefined"
      ? process.env.API_BASE_URL
      : window.ENV?.API_BASE_URL) ?? "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
