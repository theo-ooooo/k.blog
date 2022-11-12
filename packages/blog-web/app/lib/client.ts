import axios from "axios";
import { AuthResult } from "./api/auth";

const client = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:8080",
  timeout: 10000,
});

export default client;
