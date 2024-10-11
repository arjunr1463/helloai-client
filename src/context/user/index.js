"use client";

import { createContext, useState, useContext } from "react";

export const userContext = createContext();

export const useUserContext = () => {
  const { userData, setUserData } = useContext(userContext);
  return {
    userData,
    setUserData,
  };
};

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <userContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
