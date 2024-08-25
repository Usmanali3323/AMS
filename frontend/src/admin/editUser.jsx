import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../context/auth.jsx';

const EditUser = () => {
  const today = new Date();
  const { userId } = useParams();
  const [atd, setAtd] = useState('');
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState([]);
  
  const [date, setDate] = useState({
    month: (today.getMonth() + 1).toString().padStart(2, '0'), 
    year: today.getFullYear().toString()
  });

  const months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" }
  ];

  const years = Array.from({ length: 10 }, (_, i) => (today.getFullYear() - i).toString());

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const start = `${date.year}-${date.month}-01`;
        const end = `${date.year}-${date.month}-31`;

        const response = await axiosInstance.post(`/user/admin/view-user/${userId}`, { start, end });

        if (response.data.success) {
          setUser(response.data.user);
          setStatus(response.data?.atd?.map(record => ({
            date: record.date,
            status: record.atd
          })));
        } else {
          console.log("Error in fetching user");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId, date]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(`/user/admin/update-user/${user._id}`, {
        fullName: user.fullName,
        email: user.email,
        gender: user.gender
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDate(prevDate => ({
      ...prevDate,
      [name]: value
    }));
  };

  const handleAttendance = (e) => {
    setAtd(e.target.value);
  };

  const updateAttendance = async (record) => {
    try {
      const updateResponse = await axiosInstance.put(`/user/admin/update-atd/${userId}`, {
        date: record.date,
        atd
      });

      if (updateResponse.data.success) {
        setStatus(prevStatus =>
          prevStatus.map(item =>
            item.date === record.date ? { ...item, status: atd } : item
          )
        );
      } else {
        console.error('Failed to update attendance');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  if (!user) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 mb-10 transform hover:scale-105 transition duration-500">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit User Details</h2>
        <div className="mb-6">
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            name="fullName" 
            value={user.fullName} 
            onChange={handleInputChange} 
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={user.email} 
            onChange={handleInputChange} 
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="gender" className="block text-sm font-semibold text-gray-600 mb-2">Gender</label>
          <input 
            type="text" 
            id="gender" 
            name="gender" 
            value={user.gender} 
            onChange={handleInputChange} 
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm"
          />
        </div>
        <button 
          onClick={handleSave} 
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
        >
          Save Changes
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 transform hover:scale-105 transition duration-500">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Attendance Status</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="month" className="block text-sm font-semibold text-gray-600 mb-2">Month</label>
            <select 
              name="month" 
              id="month" 
              value={date.month} 
              onChange={handleDateChange} 
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm"
            >
              {months.map(({ name, value }) => (
                <option key={value} value={value}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-semibold text-gray-600 mb-2">Year</label>
            <select 
              name="year" 
              id="year" 
              value={date.year} 
              onChange={handleDateChange} 
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="min-w-full table-auto border-separate border-spacing-0 border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-gray-600 border-b">Date</th>
              <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-gray-600 border-b">Status</th>
              <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-gray-600 border-b">Update</th>
            </tr>
          </thead>
          <tbody>
            {status.map((record, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 border-b text-gray-600">{record.date}</td>
                <td className="px-6 py-4 border-b text-gray-600 uppercase">{record.status}</td>
                <td className="px-6 py-4 border-b">
                  <select 
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm" 
                    name="atd"
                    value={atd}
                    onChange={handleAttendance}
                  >
                    <option value="p">P</option>
                    <option value="l">L</option>
                    <option value="a">A</option>
                  </select>
                  <button 
                    onClick={() => updateAttendance(record)} 
                    className="bg-blue-500 text-white ml-4 px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditUser;
