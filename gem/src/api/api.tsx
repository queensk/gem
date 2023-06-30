import axios, { AxiosInstance } from "axios";

const token = localStorage.getItem("token");
const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8085",
  headers: {
    Authorization: `JWT ${token}`,
  },
});

export default api;
