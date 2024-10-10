"use client";

//module
import { Layout } from "antd";

//components
import ChatList from "../chatList";
import Message from "../message";

const LayoutE1 = ({ children }) => {
  const { Header, Sider, Content, Footer } = Layout;

  return (
    <Layout className="h-screen w-full font-monasans">
      <Sider className="!bg-[#171717] !min-w-[16%] !max-w-[16%]">
        <ChatList />
      </Sider>
      <Layout className="!bg-[#202329] w-full">
        <Header className="!bg-[#202329]"></Header>
        <Content className="!text-white font-monasans ">{children}</Content>
        <Footer className="!bg-[#202329]">
          <Message />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutE1;
