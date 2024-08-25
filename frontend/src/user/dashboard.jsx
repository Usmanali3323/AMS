import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarCheck, FaClipboardList, FaEnvelope } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../context/auth';

const UserDashboard = () => {
    const navigate = useNavigate();

    const handleMarkAttendance = async () => {
        try {
            const response = await axiosInstance.post('/user/atd', { atd: 'p' });
            // console.log(response.data);
            toast.success(response.data.message);
        } catch (error) {
            // console.error('Error marking attendance:', error.response.data.message);
            toast.error(error.response.data.message);
            //toast.error('Failed to mark attendance. Please try again.');
        }
    };

    const handleViewAttendance = () => {
        navigate('/user/view-attendance');
    };

    const handleSendLeaveRequest = () => {
        navigate('/user/send-leave-request');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-extrabold text-white">User Dashboard</h1>
                <p className="mt-4 text-xl text-white">Manage your attendance and leave requests</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                <div 
                    onClick={handleMarkAttendance} 
                    className="flex flex-col items-center justify-center bg-white py-6 px-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                    <FaRegCalendarCheck className="text-blue-600 text-6xl mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800">Mark Attendance</h2>
                    <p className="text-gray-600 mt-2 text-center">Click to mark your attendance for the day.</p>
                </div>
                <div 
                    onClick={handleViewAttendance} 
                    className="flex flex-col items-center justify-center bg-white py-6 px-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                    <FaClipboardList className="text-green-600 text-6xl mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800">View Attendance</h2>
                    <p className="text-gray-600 mt-2 text-center">View your attendance records.</p>
                </div>
                <div 
                    onClick={handleSendLeaveRequest} 
                    className="flex flex-col items-center justify-center bg-white py-6 px-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                    <FaEnvelope className="text-yellow-600 text-6xl mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800">Send Leave Request</h2>
                    <p className="text-gray-600 mt-2 text-center">Submit a leave request to your manager.</p>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default UserDashboard;
