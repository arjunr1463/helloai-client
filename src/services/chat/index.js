'use client'

//module
import Cookie from "js-cookie";

//lib
import axiosInstance from "@/lib/axiosInstance";

const ChatService = () => {
  const params = {
    subject: Cookie.get("subject"),
  };
  const getChats = async (url) => {
    try {
      const { data } = await axiosInstance.get(url, {
        params,
      });
      return data.data;
    } catch (error) {
      console.log("Error", error);
      toast.error("something went wrong");
    }
  };

  return {
    getChats,
  };
};

export default ChatService;
