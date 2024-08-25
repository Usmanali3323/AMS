// src/Context/HeaderContext.js
import { createContext, useContext, useState } from "react";

const HeaderState = createContext();

export const HeaderProvider = ({ children }) => {
    const [headerState, setHeaderState] = useState('');

    return (
        <HeaderState.Provider value={{ headerState,setHeaderState }}>
            {children}
        </HeaderState.Provider>
    );
};

export const useHeader = () => useContext(HeaderState);
