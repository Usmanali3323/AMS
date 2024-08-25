// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../context/auth.jsx';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardWrapper = styled.div`
  padding: 20px;
  background-color: #f4f6f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DashboardTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
  letter-spacing: 1px;
  text-align: center;
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow-x: auto; /* Allow horizontal scrolling for small screens */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 12px;
  border: 1px solid #ddd;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.edit ? '#4CAF50' : '#f44336'};
  color: white;
  font-size: 0.875em;
  margin: 0 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("07");
  const navigate =  useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/user/admin/view', {
          params: {
            month: selectedMonth,
            year: "2024"
          }
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedMonth]);

  const handleEdit = (id) => {
    // Handle edit action
    navigate(`/admin/dashboard/${id}`);
   
  };

  const handleDelete = (id) => {
    // Confirm deletion
    const isConfirmed = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
    if (isConfirmed) {
      // Perform delete action
      const deleteUser = async () => {
        try {
          await axiosInstance.delete(`/user/admin/delete/${id}`);
          setData(data.filter(user => user._id !== id));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
      deleteUser();
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Prepare data for the chart
  const chartData = {
    labels: data.map(user => user.userInfo.fullName),
    datasets: [{
      label: 'Number of Present Days',
      data: data.map(user => user.attendance.filter(record => record.atd === 'p').length),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  return (
    <DashboardWrapper>
      <DashboardTitle>Admin Dashboard</DashboardTitle>
      <ChartContainer>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return `Present Days: ${tooltipItem.raw}`;
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Users'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Present Days'
                },
                beginAtZero: true
              }
            }
          }}
        />
      </ChartContainer>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Attendance</Th>
              <Th>
                Month
                <Select value={selectedMonth} onChange={handleMonthChange}>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Select>
              </Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {data.map(user => (
              <tr key={user._id}>
                <Td>{user.userInfo.fullName}</Td>
                <Td>{user.userInfo.email}</Td>
                <Td>{user.attendance.filter(record => record.atd === 'p').length}</Td>
                <Td>{new Date(user.attendance[0].date).toLocaleString('default', { month: 'long' })}</Td>
                <Td>
                  <ActionsContainer>
                    <Button edit onClick={() => handleEdit(user._id)}>Edit</Button>
                    <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                  </ActionsContainer>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;
