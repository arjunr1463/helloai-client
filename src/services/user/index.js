"use client";

//module
import toast from "react-hot-toast";

//context
import { useUserContext } from "@/context/user";

//lib
import axiosInstance from "@/lib/axiosInstance";


const UserService = () => {
  const { setUserData } = useUserContext();
  const getService = async (url) => {
    try {
      const { data } = await axiosInstance.get(url);
      setUserData(data?.data);
      return data.data;
    } catch (error) {
      console.log("Errr", error);
      toast.error("something went wrong");
    }
  };
  return {
    getService,
  };
};

export default UserService;
