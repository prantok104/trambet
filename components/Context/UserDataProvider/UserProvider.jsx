import { getUserDetailsData } from "@/services/userAuthService";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AuthUserUpdate } from "@/store/reducers/AuthReducer";
const { createContext, useState, useContext, useEffect } = require("react");
// Create a context for user data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // Initial user data
  const [userData, setUserData] = useState(null);
  const [showOneClickModal, setShowOneClickModal] = useState(false);
  const [userProMuted, setUserProMuted] = useState(true);

  const dispatch = useDispatch();

  // Function to set user data
  const handleUserData = () => {
    const token = Cookies.get("token");
    if (token) {
      getUserDetailsData().then((res) => {
        setUserData(res);
        dispatch(AuthUserUpdate(res))
      });
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    handleUserData();
  }, [userProMuted]);

  const handleOneClickModal = (value) => {
    const data = JSON.parse(localStorage.getItem("oneTimeUserData"));
    if (data) {
      setShowOneClickModal(data);
    }
  };
  


  return (
    <UserContext.Provider
      value={{
        userData,
        handleUserData,
        setShowOneClickModal,
        showOneClickModal,
        handleOneClickModal,
        setUserProMuted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to access user data
export const useUserData = () => useContext(UserContext);
