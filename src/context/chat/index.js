"use client";

import { createContext, useState, useContext } from "react";

export const chatContext = createContext();

export const useChatContext = () => {
  const {
    responseLoading,
    setResponseLoading,
    newConversation,
    setNewConversation,
  } = useContext(chatContext);
  return {
    responseLoading,
    setResponseLoading,
    newConversation,
    setNewConversation,
  };
};

export const ChatContextProvider = ({ children }) => {
  const [responseLoading, setResponseLoading] = useState(false);
  const [newConversation, setNewConversation] = useState({});
  
  return (
    <chatContext.Provider
      value={{
        responseLoading,
        setResponseLoading,
        newConversation,
        setNewConversation,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};
