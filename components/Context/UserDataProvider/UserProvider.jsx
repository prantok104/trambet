import { getUserDetailsData } from "@/services/userAuthService";
import Cookies from "js-cookie";

const { createContext, useState, useContext, useEffect } = require("react");
const initialValues = {
  isOpenModa: false,
};
// Create a context for user data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // Initial user data
  const [userData, setUserData] = useState(null);
  const [showOneClickModal, setShowOneClickModal] = useState(false);

  // Function to set user data
  const handleUserData = () => {
    const token = Cookies.get("token");
    if (token) {
      getUserDetailsData().then((res) => {
        setUserData(res);
      });
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to access user data
export const useUserData = () => useContext(UserContext);
