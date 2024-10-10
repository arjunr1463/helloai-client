"use client";

//module
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    config.headers["Pragma"] = "no-cache";
    config.headers["Expires"] = "0";
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
