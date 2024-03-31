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
        maxWidth: '60px',
        minWidth: '60px',
    };
}

