import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://chatgptclone-pex5.onrender.com",
});