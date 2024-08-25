// src/components/PrivateRoute.js
import React from 'react';
import {Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../context/auth'; // 

const AdminAcces = ({Component},props) => {
    const { data } = useUser();
    const navigate = useNavigate();
    return (
       <>
            {
            data?.accessToken.length>0 && data?.user.admin? ( 
                    <Outlet/>
                ) : (
                    navigate('/signin') // Redirect to sign-in if not authenticated
                )
            }
        </>
    );
};

export default AdminAcces;
