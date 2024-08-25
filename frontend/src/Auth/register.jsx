// src/RegistrationPage.js
import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeaderProvider, useHeader } from '../context/header';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/auth';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        gender: '',
        profilePicture: null,
    });
    const{setData}=useUser();

    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const {setHeaderState} =useHeader()

    useEffect(()=>{
     setHeaderState("Signin");
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('gender', formData.gender);
        data.append('avatar', formData.profilePicture);
        
        try {
            console.log(data.profilePicture);
            
            const response = await axios.post('http://localhost:3000/user/register', data);
            toast.success(response.data.message);
            if(response.data.success){
                setData({
                   accessToken: response.data.accessToken,
                   refreshToken: response.data.refreshToken,
                   user: response.data.user,
                });
                navigate('/user/dashboard')
            }
            // Optionally redirect or perform another action
        } catch (error) {
            console.error('Registration Error:', error);
            toast.error(error.response?.data?.message || 'Registration failed.');
        }
    };

    return (

        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex items-center justify-center flex-grow bg-gradient-to-r from-blue-500 to-indigo-500">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-8 mb-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="John Doe"
                            />
                        </div>
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="profilePicture">Profile Picture</label>
                            <input
                                type="file"
                                name="profilePicture"
                                onChange={handleFileChange}
                                required
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        {imagePreview && (
                            <div className="mb-4 text-center">
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    className="w-24 h-24 object-cover rounded-full mx-auto"
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Register
                        </button>
                        <p className="mt-4 text-center text-gray-600">
                            Already have an account? <Link to="/signin" className="text-blue-600 hover:underline">Login</Link>
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            </div>

        </div>
    );
};

export default RegistrationPage;
