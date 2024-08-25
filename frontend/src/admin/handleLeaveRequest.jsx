import { useEffect, useState } from "react";
import axiosInstance from "../context/auth";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LeaveRequestHandler = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axiosInstance.get(`/user/admin/all-Leaves`);
                setLeaves(response.data.data);
            } catch (error) {
                console.error("Error fetching leave requests:", error);
            }
        };

        fetchLeaves(); // Call the async function inside useEffect
    }, []); // Empty dependency array to run this effect once after the component mounts

    const handleStatusUpdate = async (leaveId, status) => {
        try {
            console.log(leaveId);
            console.log(status);
            
            
            await axiosInstance.patch(`/user/admin/leave-approval`, {
                _id: leaveId,
                approval: status
            });
            toast.success(`Leave request ${status} successfully`);
            // Refresh leaves data after update
            const response = await axiosInstance.get(`/user/admin/all-Leaves`);
            setLeaves(response.data.data);
        } catch (error) {
            console.error("Error updating leave status:", error);
            toast.error("Failed to update leave request status.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Leave Requests</h1>
            </header>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leaves.map((leave) =>
                            leave.user.leaveRequests.map((request) => (
                                <tr key={request._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center space-x-4">
                                            <img src={leave.user.imageUrl} alt={leave.user.fullName} className="w-10 h-10 rounded-full" />
                                            <div className="text-gray-900 font-medium">{leave.user.fullName}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.leaveType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.startDate} to {request.endDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleStatusUpdate(request._id, 'accepted')}
                                                className="text-green-500 hover:text-green-700 border border-green-500 px-3 py-1 rounded-lg"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(request._id, 'rejected')}
                                                className="text-red-500 hover:text-red-700 border border-red-500 px-3 py-1 rounded-lg"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LeaveRequestHandler;
