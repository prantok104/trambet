import { getUserDetailsData } from "@/services/userAuthService";

const { createContext, useState, useContext, useEffect } = require("react");
const initialValues = {
    isOpenModa: false
}
// Create a context for user data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    // Initial user data
    const [userData, setUserData] = useState(null);
    const [showOneClickModal, setShowOneClickModal] = useState(null)

    // Function to set user data
    const handleUserData = (value) => {
        const data = JSON.parse(localStorage.getItem("userDetails"));
        if (data || value) {
            setUserData(value ? value : data);
        }
    }

    useEffect(() => {
        handleUserData()
    }, [])

    const handleOneClickModal = (value) => {
        setShowOneClickModal(!showOneClickModal)
    }

    return (
        <UserContext.Provider value={{ userData, handleUserData, setShowOneClickModal, showOneClickModal, handleOneClickModal }}>
            {children}
        </UserContext.Provider>
    );
}

// Create a hook to access user data
export const useUserData = () => useContext(UserContext);
