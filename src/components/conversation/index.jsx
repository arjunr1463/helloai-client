"use client";

// module
import useSWR, { mutate } from "swr";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

// shared
import LayoutE1 from "@/shared/layout";

// services
import ConversationService from "@/services/conversation";

// context
import { useChatContext } from "@/context/chat";

// shared
import LoadingDots from "@/shared/loading";
import Image from "next/image";

const Conversation = () => {
  // service
  const { getConversation } = ConversationService();

  // context
  const { responseLoading, newConversation, setNewConversation } =
    useChatContext();

  const { data, error, isLoading } = useSWR(
    "/v1/conversation/all",
    getConversation
  );

  useEffect(() => {
    mutate("/v1/conversation/all");
  }, []);

  // State for animated text
  const [animatedResponse, setAnimatedResponse] = useState("");

  useEffect(() => {
    if (newConversation?._id) {
      clearInterval(animationInterval.current);
      setAnimatedResponse("");
      animateText(newConversation.response, setAnimatedResponse, 10);
    }
    return () => clearInterval(animationInterval.current);

    // eslint-disable-next-line
  }, [newConversation]);

  const animationInterval = useRef(null);

  const animateText = (text, setText, delay) => {
    let index = 0;

    animationInterval.current = setInterval(() => {
      if (index < text.length) {
        setText((prev) => prev + text.charAt(index));
        index++;
      } else {
        setNewConversation({});
        clearInterval(animationInterval.current);
      }
    }, delay);
  };

  const conversationContainerRef = useRef(null);

  // Scroll to bottom when data or newConversation changes
  useEffect(() => {
    if (conversationContainerRef.current) {
      conversationContainerRef.current.scrollTop =
        conversationContainerRef.current.scrollHeight;
    }
  }, [data, newConversation]);

  // Scroll to bottom when loading response
  useEffect(() => {
    if (responseLoading) {
      if (conversationContainerRef.current) {
        conversationContainerRef.current.scrollTop =
          conversationContainerRef.current.scrollHeight;
      }
    }
  }, [responseLoading]);

  // Scroll to bottom when animated response changes
  useEffect(() => {
    if (animatedResponse) {
      if (conversationContainerRef.current) {
        conversationContainerRef.current.scrollTop =
          conversationContainerRef.current.scrollHeight;
      }
    }
  }, [animatedResponse]);

  return (
    <LayoutE1>
      <div
        ref={conversationContainerRef}
        className="flex flex-col h-full gap-8 overflow-y-auto text-[13px] xl:text-[15px] px-2 py-2 xl:px-5 xl:py-3"
      >
        {data?.length === 0 && !responseLoading && (
          <div className="flex w-full h-full items-center justify-center text-[30px] tracking-wide !font-monasansMedium">
            <div className="flex flex-col gap-3 items-center">
              <Image
                alt="hi"
                src="/assets/hi.png"
                width={60}
                height={60}
                className=""
              />

              <h1 className="tracking-widest">What can i help with?</h1>
            </div>
          </div>
        )}
        {data
          ?.filter((conversation) => conversation?._id !== newConversation?._id)
          ?.map((conversation, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div
                className={`${
                  conversation?.prompt && "flex gap-2 xl:gap-3 justify-end "
                } xl:pl-[100px]`}
              >
                <span className="bg-[#6c8afd] shadow-md px-2 py-1 xl:p-3 rounded-full leading-[30px] tracking-wide">
                  {conversation.prompt}
                </span>
                <Image
                  alt="chatbot"
                  src="/assets/user.svg"
                  width={35}
                  height={35}
                  className="max-h-[25px] min-h-[25px] min-w-[25px] max-w-[25px] xl:max-h-[35px] xl:min-h-[35px] xl:min-w-[35px] xl:max-w-[35px]"
                />
              </div>
              <div className="flex gap-2 xl:gap-3 xl:pr-[100px]">
                <Image
                  alt="chatbot"
                  src="/assets/chat-bot.png"
                  width={35}
                  height={35}
                  className="max-h-[25px] min-h-[25px] min-w-[25px] max-w-[25px] xl:max-h-[35px] xl:min-h-[35px] xl:min-w-[35px] xl:max-w-[35px]"
                />
                <span className="leading-[25px] xl:leading-[35px] shadow-md tracking-wider bg-[#2e333d] p-2 xl:p-3 rounded-[8px]">
                  <ReactMarkdown>{conversation.response}</ReactMarkdown>
                </span>
              </div>
            </div>
          ))}

        {newConversation?._id && (
          <div className="flex flex-col gap-3">
            <div
              className={`${
                newConversation?.prompt && "flex gap-3 justify-end "
              } pl-[100px]`}
            >
              <span className="bg-[#6c8afd] shadow-md p-3 rounded-full leading-[30px] tracking-wide">
                {newConversation?.prompt}
              </span>
              <Image
                alt="chatbot"
                src="/assets/user.svg"
                width={35}
                height={35}
                className="max-h-[35px] min-h-[35px] min-w-[35px] max-w-[35px]"
              />
            </div>
            <div className="flex gap-3 pr-[100px]">
              <Image
                alt="chatbot"
                src="/assets/chat-bot.png"
                width={35}
                height={35}
                className="max-h-[35px] min-h-[35px] min-w-[35px] max-w-[35px]"
              />
              <span className="leading-[35px] shadow-md tracking-wider bg-[#2e333d] p-3 rounded-[8px]">
                <ReactMarkdown>{animatedResponse}</ReactMarkdown>
              </span>
            </div>
          </div>
        )}
        {responseLoading && (
          <div className="flex gap-3 pr-[100px]">
            <Image
              alt="chatbot"
              src="/assets/chat-bot.png"
              width={35}
              height={35}
              className="max-h-[35px] min-h-[35px] min-w-[35px] max-w-[35px]"
            />
            <LoadingDots />
          </div>
        )}
      </div>
    </LayoutE1>
  );
};

export default Conversation;
