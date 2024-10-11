"use client";

//module
import toast from "react-hot-toast";

//context
import { useUserContext } from "@/context/user";

//lib
import axiosInstance from "@/lib/axiosInstance";


const UserService = () => {
  const { setUserData } = useUserContext();
  const getUserService = async (url) => {
    try {
      const { data } = await axiosInstance.get(url);
      setUserData(data?.data);
      return data.data;
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return {
    getUserService,
  };
};

export default UserService;
