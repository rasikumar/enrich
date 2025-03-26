/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// Create context
const ListContext = createContext();

// Provider component
export const ListProvider = ({ children }) => {
  const [selectedList, setSelectedList] = useState("All");

  return (
    <ListContext.Provider value={{ selectedList, setSelectedList }}>
      {children}
    </ListContext.Provider>
  );
};

// Custom hook for easy usage
export const useList = () => useContext(ListContext);
