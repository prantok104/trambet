import { toast } from "react-toastify";
// Set local storage
export const setLocal = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Local storage set item error", error);
    return null;
  }
};

// Get from local storage
export const getLocal = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
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
        maxwidth: '60px',
        minwidth: '60px',
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