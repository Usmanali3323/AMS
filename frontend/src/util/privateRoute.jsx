// src/components/PrivateRoute.js
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../context/auth';

const PrivateRoute = () => {
    const { data } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.user?.admin) {
            navigate('/admin/dashboard');
        } else if (!data?.accessToken) {
            navigate('/signin');
        }
    }, [data, navigate]);

    if (data?.accessToken) {
        return <Outlet />;
    }

    return null;
};

export default PrivateRoute;
