import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, X-Auth-Token, Authorization, Accept, charset, boundary, Content-Length",
  },
});
