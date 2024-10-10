"use client";

//module
import Cookie from "js-cookie";
import Link from "next/link";

const Dashboard = () => {
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
    <div className="bg-[#171717] overflow-hidden h-screen px-[15px] py-[25px] text-white">
      <div className="border-[1px] border-[white] min-h-[40%] max-h-[40%]"></div>
      <div className="border-[1px] border-[white] min-h-[60%] max-h-[60%]">
        <div>
          <h1>Choose the subject</h1>
        </div>
        <div className="grid grid-cols-6 gap-x-4">
          {subjects?.map((subject, i) => {
            return (
              <Link key={i} href="/chat">
                <div
                  onClick={() => Cookie.set("subject", subject?.name)}
                  className="bg-[#17181c] cursor-pointer border-[1px] border-[#353945] rounded-[10px] overflow-hidden"
                >
                  <div
                    style={{
                      background:
                        i % 2 === 0
                          ? "linear-gradient(to right, #FFCDD2, #EF9A9A, #E57373)"
                          : "linear-gradient(to right, #C8E6C9, #A5D6A7, #81C784)",
                    }}
                    className="bg-green-500 h-[220px]"
                  ></div>
                  <div className="px-2 py-3 text-center">
                    <span className="capitalize font-medium">
                      {subject.name}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
