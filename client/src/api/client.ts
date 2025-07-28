import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://chatgptclone-obvd.onrender.com/",
});