import { userLogout } from "@/services/userAuthService";
import LogoutContext from "../../Context/Users/LogoutContext";
import { AuthUserLogout } from "@/store/reducers/AuthReducer";
import { useDispatch } from "react-redux";

export const LogoutProvider = ({ children }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(AuthUserLogout(null));
    userLogout();
    // window.location.reload();
  };

  return (
    <LogoutContext.Provider value={handleLogout}>
      {children}
    </LogoutContext.Provider>
  );
};
