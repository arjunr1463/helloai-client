"use client";

//module
import Cookie from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import { Header } from "antd/es/layout/layout";

//assets
import { FaArrowRightLong } from "react-icons/fa6";
import useSWR from "swr";
import UserService from "@/services/user";
import Image from "next/image";
import toast from "react-hot-toast";

const Dashboard = () => {
  //state
  const [selectedSubject, setSelectedSubject] = useState("");

  const { getUserService } = UserService();

  const { data } = useSWR("/v1/user", getUserService);

  const subjects = [
    {
      _id: 1,
      name: "computer science",
    },
    {
      _id: 2,
      name: "physics",
    },
    {
      _id: 3,
      name: "biology",
    },
  ];


  return (
    <div className="bg-[#171717] h-screen flex flex-col text-white">
      <Header className="!bg-[#171717] !px-4 flex items-center justify-between !text-white">
        <div className="flex items-center gap-3">
          <span className="font-monasansSemibold tracking-[10px] text-[18px]">
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
      <div className="flex items-center py-6 px-4 h-full">
        <div className=" flex flex-col gap-5  text-center items-center">
          <div className="flex flex-col gap-3">
            <h1 className="text-[35px] font-monasansBold tracking-widest">
              Explore the Future of Learning with AI-Powered Subjects
            </h1>
          </div>
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
        <div className="flex flex-col  items-center min-w-[50%] max-w-[50%]">
          <div className="flex flex-col gap-3">
            <h3 className="text-[40px] font-monasansItalic">Manage Subjects</h3>
          </div>
          <div className=" flex justify-center w-full border-[white] py-6">
            <div className="grid grid-cols-3 gap-x-4 ">
              {subjects?.map((subject, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedSubject(subject?.name)}
                    className={`bg-[#17181c] text-[12px] font-monasans tracking-widest cursor-pointer border-[1px] border-[#353945] rounded-[10px] overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${
                      selectedSubject === subject.name &&
                      "border-[#6c8afd] !shadow-[0_4px_15px_rgba(108,138,253,0.5)]"
                    }`}
                  >
                    <div
                      style={{
                        background:
                          i % 5 === 0
                            ? "linear-gradient(to right, #FFCDD2, #EF9A9A, #E57373)"
                            : i % 5 === 1
                            ? "linear-gradient(to right, #C8E6C9, #A5D6A7, #81C784)"
                            : i % 5 === 2
                            ? "linear-gradient(to right, #FFECB3, #FFD54F, #FFCA28)"
                            : i % 5 === 3
                            ? "linear-gradient(to right, #B39DDB, #9575CD, #7E57C2)"
                            : "linear-gradient(to right, #B2EBF2, #4DD0E1, #26C6DA)",
                      }}
                      className="h-[80px] relative shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
                    ></div>
                    <div className="px-2 py-3 text-center">
                      <span className="capitalize font-semibold">
                        {subject.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <Link href={selectedSubject === "" ? "/dashboard" : "/chat"}>
              <button
                onClick={() =>
                  selectedSubject !== ""
                    ? Cookie.set("subject", selectedSubject)
                    : toast.error("please select a subject")
                }
                className="bg-[#6c8afd] hover:bg-[#506fd4] transition-all duration-300 ease-in-out flex items-center gap-3 font-monasansMedium rounded-full px-6 py-3 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span className="text-white">Get Started</span>
                <FaArrowRightLong className="text-white transition-transform duration-300 transform group-hover:translate-x-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
