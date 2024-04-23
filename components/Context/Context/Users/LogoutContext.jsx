import { createContext, useContext } from "react";
const LogoutContext = createContext();

export const useLogout = () => useContext(LogoutContext);

export default LogoutContext;