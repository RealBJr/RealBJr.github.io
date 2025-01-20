"use client"
import React, { createContext, useContext, useState } from "react";

// Create context
const ActiveSectionContext = createContext();

// Custom hook to use the context
export const useActiveSection = () => useContext(ActiveSectionContext);

// Provider component
export const ActiveSectionProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState("");

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </ActiveSectionContext.Provider>
    );
};
