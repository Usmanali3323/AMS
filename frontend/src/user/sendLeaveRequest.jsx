import React, { useState, useEffect } from 'react';
import axiosInstance from '../context/auth';
import { toast, ToastContainer } from 'react-toastify';

const SendLeaveRequest = () => {
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [pastLeaves, setPastLeaves] = useState([]);

    const leaveTypes = ['Sick Leave', 'Casual Leave', 'Vacation Leave'];

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/user/leave', {
                leaveType: leaveType.toLowerCase(),
                startDate,
                endDate,
            });
            toast.success(response.data.message);
            fetchPastLeaves(); // Fetch updated leave records
        } catch (error) {
            console.error('Error sending leave request:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Failed to send leave request. Please try again.');
        }
    };

    // Fetch past leave requests
    const fetchPastLeaves = async () => {
        try {
            const response = await axiosInstance.get('/user/view-leave-record');
            setPastLeaves(response.data.leaves);
            console.log(response);
            
        } catch (error) {
            console.error('Error fetching past leaves:', error.response?.data?.message || error);
            toast.error(error.response?.data?.message || 'Failed to fetch past leave requests.');
        }
    };

    useEffect(() => {
        fetchPastLeaves(); // Fetch past leaves on component mount
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">Send Leave Request</h1>
                <p className="mt-4 text-lg md:text-xl text-white">Submit your leave request and view past leave records</p>
            </header>

            {/* Leave Request Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Request Leave</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">Leave Type</label>
                        <select
                            id="leaveType"
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="" disabled>Select Leave Type</option>
                            {leaveTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-lg"
                    >
                        Submit Request
                    </button>
                </form>
            </div>

            {/* Past Leave Requests */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-x-auto">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Past Leave Requests</h2>
                {pastLeaves.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pastLeaves.map((leave, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">{leave.leaveType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{leave.startDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{leave.endDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{leave.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-600">No past leave requests found.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default SendLeaveRequest;
