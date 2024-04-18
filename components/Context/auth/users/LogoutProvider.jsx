import { createContext, useState, useContext } from "react";

const LogoutContext = createContext();

export const LogoutProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const handleLogout = () => {
        userLogout().then(() => {
          setUser(null);
        });
      };
    
      return (
        <LogoutContext.Provider value={handleLogout}>
          {children}
        </LogoutContext.Provider>
      );
    };

export const useLogout = () => useContext(LogoutContext);