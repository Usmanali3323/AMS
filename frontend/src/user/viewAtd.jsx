import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../context/auth.jsx';

const ViewAttendance = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const fetchAttendance = async () => {
        try {
            const response = await axiosInstance.post(`/user/view`, { month, year });
            setAttendanceRecords(response.data.attendanceRecords);
            toast.success('Attendance records fetched successfully.');
        } catch (error) {
            console.error('Error fetching attendance records:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Failed to fetch attendance records. Please try again.');
        }
    };

    useEffect(() => {
        if (month && year) {
            fetchAttendance();
        }
    }, [month, year]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 p-6">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">View Attendance</h1>
                <p className="mt-4 text-lg md:text-xl text-white">Select a month to view your attendance records</p>
            </header>

            <div className="flex flex-col md:flex-row items-center justify-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
                <select
                    value={month}
                    onChange={handleMonthChange}
                    className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="" disabled>Select Month</option>
                    {months.map((m, index) => (
                        <option key={index} value={index + 1}>{m}</option>
                    ))}
                </select>
                <input
                    type="number"
                    value={year}
                    onChange={handleYearChange}
                    className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                    min="2000"
                    max={new Date().getFullYear()}
                    placeholder="Year"
                />
                <button
                    onClick={fetchAttendance}
                    className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                >
                    View Attendance
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl overflow-x-auto">
                {attendanceRecords?.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {attendanceRecords.map((record, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap uppercase">{record.atd}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{record.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-600">No attendance records found for the selected month.</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
};

export default ViewAttendance;
