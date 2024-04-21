import { userLogout } from "@/services/userAuthService";
import { createContext, useState, useContext } from "react";
import LogoutContext from "../../Context/Users/LogoutContext";

export const LogoutProvider = ({ children }) => {
    const handleLogout = () => {
        userLogout();
        // window.location.reload();
    };

    return (
        <LogoutContext.Provider value={handleLogout}>
            {children}
        </LogoutContext.Provider>
    );
};