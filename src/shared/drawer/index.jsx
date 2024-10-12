import { useRef, useEffect } from "react";
import ChatList from "../chatList";
import "animate.css"; // Import animate.css styles

const DrawerComponent = ({ openDrawer, setOpenDrawer }) => {
  const ref = useRef();

  useEffect(() => {
    // Event handler to detect outside clicks
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenDrawer(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenDrawer]);

  return (
    <div
      ref={ref}
      className={`!bg-[#232323] z-[10] h-full absolute left-0 min-w-[65%] max-w-[65%] animate__animated ${
        openDrawer ? "animate__slideInLeft" : "animate__slideOutLeft"
      }`}
    >
      <ChatList />
    </div>
  );
};

export default DrawerComponent;
