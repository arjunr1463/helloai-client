"use client";

//module
import Cookie from "js-cookie";

//lib
import axiosInstance from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { useRouter } from "next/navigation";

const ChatService = () => {
  const router = useRouter();
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
      toast.error(error?.response?.data?.message);
    }
  };

  const createChat = async () => {
    try {
      const { data } = await axiosInstance.post("/v1/chat/create", {
        subject: params.subject,
      });
      if (data?.status) {
        mutate("/v1/chat/all");
        router.push(`/chat/${data.data._id}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteChat = async (id) => {
    try {
      const { data } = await axiosInstance.delete("/v1/chat/delete", {
        params: {
          chatId: id,
        },
      });
      if (data?.status) {
        mutate("/v1/chat/all");
        router.push(`/chat`);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const renameChat = async (id, name) => {
    try {
      const { data } = await axiosInstance.put("/v1/chat/rename", {
        chatId: id,
        name: name,
        subject: params.subject,
      });
      if (data?.status) {
        mutate("/v1/chat/all");
        router.push(`/chat`);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return {
    getChats,
    createChat,
    deleteChat,
    renameChat,
  };
};

export default ChatService;
