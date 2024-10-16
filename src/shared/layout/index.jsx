"use client";

//module
import { Drawer, Dropdown, Layout } from "antd";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//components
import ChatList from "../chatList";
import Message from "../message";
import DrawerComponent from "../drawer";

//context
import Image from "next/image";
import UserService from "@/services/user";
import SubjectService from "@/services/subject";

//assets
import { IoMdArrowDropdown } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineRollback } from "react-icons/ai";

const LayoutE1 = ({ children }) => {
  const { Header, Sider, Content, Footer } = Layout;
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [initialDrawer, setInitialDrawer] = useState(false);

  //service
  const { getUserService } = UserService();
  const { getSubject } = SubjectService();

  const { data } = useSWR("/v1/user", getUserService);
  const subject = useSWR("/v1/subject", getSubject);

  useEffect(() => {
    setSelectedSubject(Cookies.get("subject"));
  }, []);

  useEffect(() => {
    if (fetchData) {
      mutate("/v1/chat/all");
      setFetchData(false);
    }
  }, [fetchData]);

  useEffect(() => {
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();

    window.addEventListener("resize", setVh);

    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <Layout
      className=" w-full font-monasans relative"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <DrawerComponent
        openDrawer={openDrawer && initialDrawer}
        initialDrawer={initialDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <Sider className="!bg-[#232323] hidden xl:!flex !p-0 !m-0 !min-w-[250px] max-w-[250px]">
        <ChatList />
      </Sider>
      <Layout className="!bg-[#171717]">
        <Header className="!bg-[#171717] !leading-[16px] !py-0 !px-4 flex justify-between items-center">
          <Dropdown
            value={selectedSubject}
            menu={{
              items: subject?.data?.map((item, i) => {
                return {
                  label: (
                    <span className="capitalize !font-monasans text-white">
                      {item.name}
                    </span>
                  ),
                  key: item.name,
                  value: item.name,
                  onClick: (value) => {
                    Cookies.set("subject", value.key);
                    router.push("/chat");
                    setSelectedSubject(value.key);
                    setFetchData(true);
                  },
                };
              }),
            }}
            trigger={["click"]}
            className=" !leading-0 hidden xl:flex"
          >
            <div className="flex items-center cursor-pointer">
              <span className="!leading-0 text-white font-monasansMedium capitalize">
                {selectedSubject}
              </span>
              <IoMdArrowDropdown className="text-white text-[20px]" />
            </div>
          </Dropdown>
          <RiMenu3Fill
            onClick={() => {
              setOpenDrawer(!openDrawer);
              setInitialDrawer(true);
            }}
            className="text-white text-[25px] xl:hidden "
          />
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <div
                      className="text-white !font-monasans flex items-center gap-2"
                      onClick={() => {
                        router.push("/dashboard");
                      }}
                    >
                      <AiOutlineRollback className="text-[16px]" />
                      <span>Back</span>
                    </div>
                  ),
                  key: 1,
                },
                {
                  label: (
                    <div
                      className="text-white !font-monasans flex items-center gap-2"
                      onClick={() => {
                        Cookies.remove("subject");
                        Cookies.remove("token");
                        router.push("/");
                      }}
                    >
                      <BiLogOut className="text-[16px]" />
                      <span>Logout</span>
                    </div>
                  ),
                  key: 2,
                },
              ],
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

        <Content className="!text-white font-monasans">{children}</Content>
        <Footer className="!bg-[#171717] !p-2 !pb-5 xl:!py-8 xl:!px-16">
          <Message />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutE1;
