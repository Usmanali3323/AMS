// src/LoginPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { HeaderProvider, useHeader } from '../context/header';
import { useUser } from '../context/auth';

const LoginPage = () => {
   const {setHeaderState} =useHeader(); 
   const{setData}= useUser()
   const navigate = useNavigate();
   useEffect(()=>{
    setHeaderState("Register");
   })
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/login', formData);
            toast.success(response.data.message);
            if(response.data.success){
                setData(
                    {
                        accessToken:response.data.accessToken,
                        refreshToken:response.data.refreshToken,
                        user:response.data.user
                    });
                navigate('/user/dashboard');
                
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex items-center justify-center flex-grow bg-gradient-to-r from-blue-500 to-indigo-500">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-8 mb-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="********"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Login
                        </button>
                        <p className="mt-4 text-center text-gray-600">
                            Don't have an account? <Link to="/" className="text-blue-600 hover:underline">Register</Link>
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
