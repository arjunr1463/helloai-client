"use client";

//module
import Cookie from "js-cookie";

//lib
import axiosInstance from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const ConversationService = () => {
  const { id } = useParams();
  const params = {
    subject: Cookie.get("subject"),
    chatId: id,
  };
  const getConversation = async (url) => {
    try {
      const { data } = await axiosInstance.get(url, {
        params,
      });
      return data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return {
    getConversation,
  };
};

export default ConversationService;
