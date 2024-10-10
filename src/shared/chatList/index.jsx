//module
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Header } from "antd/es/layout/layout";

//lib
import Link from "next/link";

//service
import ChatService from "@/services/chat";

//assets
import { IoChatbox } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
// import { MdAdd } from "react-icons/md";

const ChatList = () => {
  const { id } = useParams();
  //service
  const { getChats } = ChatService();
  const { data, error, isLoading } = useSWR("/v1/chat/all", getChats);

  return (
    <div className="flex flex-col gap-2 font-monasansMedium !text-white h-full w-full">
      <Header className="!bg-[#171717] !p-0">
        
      </Header>
      {data?.map((chat, i) => (
        <Link key={i} href={`/chat/${chat._id}`}>
          <div
            className={`flex items-center items-center justify-between ${
              id === chat._id && "bg-[#212121]"
            } hover:bg-[#212121] cursor-pointer rounded-[5px] px-2 py-3`}
          >
            <div className="flex items-center items-center gap-2">
              <IoChatbox className="text-[#2e333d] text-[16px]" />
              <span className="capitalize !text-white">{chat.name}</span>
            </div>
            <MdModeEdit className="text-[#2e333d]" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;
