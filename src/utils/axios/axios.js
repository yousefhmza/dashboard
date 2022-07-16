import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://e-commerce-app-poc.herokuapp.com/v1/",
  headers: {
    lng: "en",
  },
});
