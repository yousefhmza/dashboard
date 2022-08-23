import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://e-commerce-app-poc-2.herokuapp.com/v1/",
  headers: {
    lng: "en",
  },
});
