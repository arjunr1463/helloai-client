//context
import { ChatContextProvider } from "@/context/chat";

const ContextProvider = ({ children }) => {
  return <ChatContextProvider>{children}</ChatContextProvider>;
};

export default ContextProvider;
