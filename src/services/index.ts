import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    page: 1,
  },
});

export default axios.create({
  baseURL: "https://api.themoviedb.org/4",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_AUTH_TOKEN}`,
  },
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    page: 1,
  },
});
