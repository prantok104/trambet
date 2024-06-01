import dayjs from "dayjs";
import { toast } from "react-toastify";

export const API_HOST =
  "https://www.goalserve.com/getfeed/ef2762546f6a447cc37608dc6b5e7b62";
export const SEASON = dayjs().year();

export const API_KEY = 'ef2762546f6a447cc37608dc6b5e7b62';
export const DATA_SERVER = 'http://data2.goalserve.com:8084/api/v1/logotips'

// Set local storage
export const setLocal = (key, value) => {
  try {
    if(typeof window != 'undefined'){
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error("Local storage set item error", error);
    return null;
  }
};

// Get from local storage
export const getLocal = (key) => {
  try {
    if(typeof window != 'undefined') { 
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  } catch (error) {
    console.error("Local storage set item error", error);
    return null;
  }
};


// Data table index column
export function rowIndex(rows) {
    return {
        name: '#',
        cell: (row, index) => (Number(rows?.current_page ?? 1) - 1) * Number(rows?.per_page ?? 10) + (index + 1),
        maxwidth: '40px',
        minwidth: '40px',
    };
}

// Notifiable

export  function notify(type, message) {
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    className:'tramcard-toast',
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
       toast(message, options);
      break;
  }
}