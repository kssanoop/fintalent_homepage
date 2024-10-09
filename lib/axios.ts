import Axios from "axios";

import storage from "@/utils/storage";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.request.use((config) => {
  const token = storage.getToken("user_data");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response.status === 401) {
      console.log("called");
      storage.clearCookies("user_data");
      window.location.href = "/";
    }
    console.log(error);
    // const message = error.response?.data?.message || error.message;
    // toast.error(message);

    return await Promise.reject(error);
  },
);
