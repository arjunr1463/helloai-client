//module
import { useChatContext } from "@/context/chat";
import axiosInstance from "@/lib/axiosInstance";
import { Input } from "antd";
import jsCookie from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

//assets
import { IoArrowUpSharp } from "react-icons/io5";
import { mutate } from "swr";

const Message = () => {
  const { id } = useParams();
  const router = useRouter();

  const [prompt, setPrompt] = useState("");

  //context
  const { setResponseLoading, setNewConversation, newConversation } =
    useChatContext();

  const handleSubmitPrompt = async () => {
    setResponseLoading(true);
    setPrompt("");
    try {
      if (id === undefined) {
        const { data } = await axiosInstance.post("/v1/chat/create", {
          subject: jsCookie.get("subject"),
        });
        if (data.status) {
          router.push(`/chat/${data?.data?._id}`);
          const response = await axiosInstance.post("/v1/conversation/create", {
            chat: data?.data?._id,
            subject: jsCookie.get("subject"),
            prompt: prompt,
          });
          if (response.data.status) {
            setResponseLoading(false);
            setNewConversation(response.data.data);
            mutate("/v1/conversation/all");
          }
        }
      } else {
        const { data } = await axiosInstance.post("/v1/conversation/create", {
          chat: id,
          subject: jsCookie.get("subject"),
          prompt: prompt,
        });
        if (data.status) {
          setResponseLoading(false);
          setNewConversation(data.data);
          mutate("/v1/conversation/all");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setResponseLoading(false);
    }
  };
  return (
    <div className="w-full h-full ">
      <div className="">
        <Input
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          value={prompt}
          onKeyDown={async (e) => {
            if (
              e.key.toLowerCase() === "enter" &&
              prompt !== "" &&
              !newConversation?._id
            ) {
              await handleSubmitPrompt();
            }
          }}
          placeholder="Message HelloAI"
          type="text"
          className="!bg-[#171717] min-h-[55px] max-h-[55px] !font-monasans !tracking-wide !text-white"
          suffix={
            <button
              disabled={prompt === "" || newConversation?._id}
              onClick={handleSubmitPrompt}
              className="!bg-[#6c8afd] cursor-pointer rounded-full h-[35px] w-[35px] flex flex-col items-center justify-center transition-transform transform hover:scale-110 hover:shadow-lg active:animate-bounce"
            >
              <IoArrowUpSharp className="text-[white] text-[20px]" />
            </button>
          }
        />
      </div>
    </div>
  );
};

export default Message;
