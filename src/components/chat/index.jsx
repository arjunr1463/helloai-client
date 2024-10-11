//shared
import LayoutE1 from "@/shared/layout";
import Image from "next/image";

const Chat = () => {
  return (
    <LayoutE1>
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
    </LayoutE1>
  );
};

export default Chat;
