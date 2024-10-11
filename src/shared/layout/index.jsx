"use client";

//module
import { Dropdown, Layout } from "antd";
import useSWR from "swr";

//components
import ChatList from "../chatList";
import Message from "../message";

//context
import Image from "next/image";
import UserService from "@/services/user";

//assets
import { IoMdArrowDropdown } from "react-icons/io";
import Cookies from "js-cookie";

const LayoutE1 = ({ children }) => {
  const { Header, Sider, Content, Footer } = Layout;
  const { getService } = UserService();
  const subject = Cookies.get("subject");
  const { data } = useSWR("/v1/user", getService);

  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <Layout className="h-screen w-full font-monasans">
      <Sider className="!bg-[#232323]  !min-w-[16%] !max-w-[16%]">
        <ChatList />
      </Sider>
      <Layout className="!bg-[#171717]  w-full">
        <Header className="!bg-[#171717] !leading-[16px] !py-0 !px-4 flex justify-between items-center">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            className=" !leading-0"
          >
            <div className="flex items-center cursor-pointer">
              <span className="!leading-0 text-white font-monasansMedium capitalize">
                {subject}
              </span>
              <IoMdArrowDropdown className="text-white text-[20px]" />
            </div>
          </Dropdown>

          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            className=" !leading-0"
          >
            <Image
              alt="profile"
              src={data?.profile_picture}
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
            />
          </Dropdown>
        </Header>
        <Content className="!text-white font-monasans ">{children}</Content>
        <Footer className="!bg-[#171717]">
          <Message />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutE1;
