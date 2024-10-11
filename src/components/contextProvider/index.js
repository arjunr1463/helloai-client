//context
import { ChatContextProvider } from "@/context/chat";
import { UserContextProvider } from "@/context/user";

const ContextProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <ChatContextProvider>{children}</ChatContextProvider>
    </UserContextProvider>
  );
};

export default ContextProvider;
