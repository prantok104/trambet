import React, { createContext } from "react";
import { getLocal } from "../Helper";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const language = getLocal("language") || null;
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
};
