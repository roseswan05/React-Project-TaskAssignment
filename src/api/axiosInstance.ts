import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "https://dummyjson.com",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return Promise.reject(error);
  }
);

export default instance;