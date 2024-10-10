//module
import { useChatContext } from "@/context/chat";
import axiosInstance from "@/lib/axiosInstance";
import { Input } from "antd";
import jsCookie from "js-cookie";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

//assets
import { IoArrowUpSharp } from "react-icons/io5";
import { mutate } from "swr";

const Message = () => {
  const { id } = useParams();

  const [prompt, setPrompt] = useState("");

  //context
  const { setResponseLoading, setNewConversation } = useChatContext();

  const handleSubmitPrompt = async () => {
    setResponseLoading(true);
    setPrompt("");
    try {
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
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="w-full h-full pl-3 pr-6">
      <div>
        <Input
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          value={prompt}
          onKeyDown={async (e) => {
            if (e.key.toLowerCase() === "enter") {
              await handleSubmitPrompt();
            }
          }}
          placeholder="Message HelloAI"
          type="text"
          className="!bg-[#171717] min-h-[55px] max-h-[55px] !font-monasans !tracking-wide !text-white"
          suffix={
            <div
              onClick={handleSubmitPrompt}
              className="!bg-[#6c8afd] cursor-pointer rounded-full h-[35px] w-[35px] flex flex-col items-center justify-center"
            >
              <IoArrowUpSharp className="text-[white] text-[20px]" />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Message;
