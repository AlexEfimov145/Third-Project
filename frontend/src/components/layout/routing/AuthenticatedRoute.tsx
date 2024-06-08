import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UnauthenticatedRoute = () => {
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};

export default UnauthenticatedRoute;
