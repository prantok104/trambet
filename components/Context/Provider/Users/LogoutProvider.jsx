import { userLogout } from "@/services/userAuthService";
import LogoutContext from "../../Context/Users/LogoutContext";
import { AuthUserUpdate } from "@/store/reducers/AuthReducer";
import { useDispatch } from "react-redux";


export const LogoutProvider = ({ children }) => {
const dispatch = useDispatch();
    const handleLogout = () => {
        userLogout();
       dispatch(AuthUserUpdate({}));
        // window.location.reload();
    };

    return (
        <LogoutContext.Provider value={handleLogout}>
            {children}
        </LogoutContext.Provider>
    );
};