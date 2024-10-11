//module
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Footer } from "antd/es/layout/layout";
import { Divider } from "antd";
import { Skeleton } from "antd";

//lib
import Link from "next/link";

//service
import ChatService from "@/services/chat";

//assets
import { IoChatbox } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdAdd } from "react-icons/md";

//style
import "./index.css";

const ChatList = () => {
  const { id } = useParams();
  //service
  const { getChats, createChat } = ChatService();
  const { data, error, isLoading } = useSWR("/v1/chat/all", getChats);

  return (
    <div className="flex flex-col gap-2 font-monasansMedium !text-white h-full w-full">
      <div className="flex w-full !py-4 px-1">
        <button
          onClick={createChat}
          className="flex px-2 items-center shadow-md gap-2 w-full bg-[#333333] py-3 rounded-[8px] text-white !font-monasansMedium tracking-wide transition-all duration-300 transform hover:bg-[#333333] hover:scale-105 hover:shadow-lg active:scale-95"
        >
          <MdAdd className="text-[20px]" />
          New Chat
        </button>
      </div>
      {isLoading ? (
        <div className="h-full px-1">
          <Skeleton />
        </div>
      ) : (
        <div className="scrollhide flex flex-col gap-2 h-full overflow-y-auto px-1">
          {data?.map((chat, i) => (
            <Link key={i} href={`/chat/${chat._id}`}>
              <div
                className={`flex items-center items-center justify-between ${
                  id === chat._id && "bg-[#171717]"
                } hover:bg-[#171717] cursor-pointer rounded-[5px] px-2 py-3`}
              >
                <div className="flex items-center items-center gap-2">
                  <IoChatbox className="text-gray-500 text-[16px]" />
                  <span className="capitalize !font-monasansMedium tracking-wide !text-white">
                    {chat.name}
                  </span>
                </div>
                <MdModeEdit
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="text-gray-500 transition-all duration-300 transform hover:text-blue-500 hover:scale-110 active:scale-90"
                />
              </div>
            </Link>
          ))}
        </div>
      )}

      <Divider className="bg-gray-700 !p-0 !m-0" />
      <Footer className="!bg-[#232323]">
        <span className="font-monasansSemibold !text-white tracking-[10px] text-[18px]">
          HELLO<span className="text-[#6c8afd] font-monasansBold">AI</span>
        </span>
      </Footer>
    </div>
  );
};

export default ChatList;
