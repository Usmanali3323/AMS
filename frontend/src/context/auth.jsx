// src/Context/HeaderContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserData = createContext();

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    } // Your API base URL
});

export const UserDataProvider = ({ children }) => {
    const [data, setData] = useState({accessToken:'',refreshToken:'',user:{}});

    useEffect(() => {
        // Check if token exists in data and set Authorization header
        console.log(data);
        if (data?.accessToken?.length > 0) {
            console.log("accessToken : "+data.accessToken);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data?.accessToken}`;
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }

        return () => {
            // Cleanup function to remove the Authorization header
            delete axiosInstance.defaults.headers.common['Authorization'];
        };
    }, [data]);

    return (
        <UserData.Provider value={{ data, setData }}>
            {children}
        </UserData.Provider>
    );
};

export const useUser = () => useContext(UserData);

export default axiosInstance; // Export the Axios instance for use in components
