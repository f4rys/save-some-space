import React, { createContext, useContext } from "react";

const LogoContext = createContext();

export const LogoProvider = ({ children, handleLogoClick }) => {
  return (
    <LogoContext.Provider value={handleLogoClick}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogoClick = () => {
  return useContext(LogoContext);
};
