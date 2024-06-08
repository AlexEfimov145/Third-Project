import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import authService from '../../../services/Auth';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const decodedToken = jwtDecode<{ user: { id: number } }>(token);
            const userId = decodedToken.user.id;

            authService.isAdmin(userId).then(isAdmin => {
                setIsAdmin(isAdmin);
            }).catch(() => {
                setIsAdmin(false);
            });
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    if (isAuthenticated === null || isAdmin === null) {
        return null; // or a loading spinner, if preferred
    }

    if (!isAuthenticated) {
        return <Navigate to="/page404" replace />;
    }

    if (isAdmin) {
        return <Navigate to="/adminPage" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
