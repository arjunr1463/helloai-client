"use client";

//module
import Cookie from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import toast from "react-hot-toast";
import useSWR from "swr";

//services
import UserService from "@/services/user";

//assets
import { FaArrowRightLong } from "react-icons/fa6";
import SubjectService from "@/services/subject";
import Carousel from "@/shared/carousel";
import { Skeleton } from "antd";

const Dashboard = () => {
  //state
  const [selectedSubject, setSelectedSubject] = useState("");

  const { getUserService } = UserService();
  const { getSubject } = SubjectService();

  const { data } = useSWR("/v1/user", getUserService);
  const subject = useSWR("/v1/subject", getSubject);

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
    <div
      className="bg-[#171717] flex flex-col w-full text-white"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <Header className="!bg-[#171717] !px-4 flex items-center justify-between !text-white">
        <div className="flex items-center gap-3">
          <span className="font-monasansSemibold tracking-[4px] xl:tracking-[10px] text-[18px]">
            HELLO<span className="text-[#6c8afd] font-monasansBold">AI</span>
          </span>
        </div>
        <Image
          src={data?.profile_picture}
          alt="profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </Header>
      <div className="flex flex-col h-full w-full gap-12 xl:gap-0 xl:flex-row items-center justify-center overflow-hidden px-3 xl:py-6 xl:px-4 h-full">
        <div className="flex flex-col gap-5  text-center items-center">
          <h1 className="text-[20px] xl:text-[32px]  font-monasansSemibold tracking-widest">
            Explore the Future of Learning with AI-Powered Subjects
          </h1>
          <div className="rounded-[12px] overflow-hidden w-full custom-shadow">
            <Image
              className="object-cover"
              alt="banner"
              src="/assets/banner_1.png"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="flex flex-col  items-center w-full xl:min-w-[60%] xl:max-w-[60%]">
          <div className="flex flex-col gap-3">
            <h3 className="text-[25px] xl:text-[40px] font-monasansItalic">
              Manage Subjects
            </h3>
          </div>
          {subject.isLoading ? (
            <div className="flex gap-3 px-3 py-3">
              <Skeleton.Node active={true} className=" !bg-[#232323] " />
              <Skeleton.Node active={true} className=" !bg-[#232323]" />
              <Skeleton.Node
                active={true}
                className="!hidden xl:!flex !bg-[#232323]"
              />
            </div>
          ) : (
            <Carousel
              subject={subject}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
            />
          )}

          <div className="flex justify-center pt-6">
            <Link href={selectedSubject === "" ? "/dashboard" : "/chat"}>
              <button
                onClick={() =>
                  selectedSubject !== ""
                    ? Cookie.set("subject", selectedSubject)
                    : toast.error("please select a subject")
                }
                className="bg-[#6c8afd] hover:bg-[#506fd4] transition-all duration-300 ease-in-out flex items-center gap-3 font-monasansMedium rounded-full px-4 py-2 xl:px-6 xl:py-3 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span className="text-white text-[13px] xl:text-[14px]">
                  Get Started
                </span>
                <FaArrowRightLong className="text-white text-[12px] xl:text-[16px] transition-transform duration-300 transform group-hover:translate-x-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
