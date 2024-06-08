import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import authService from '../../../services/Auth';
import notifyService from '../../../services/Notify';

const AdminRoute = (): JSX.Element | null => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<{ user: { id: number } }>(token);
                const userId = decodedToken.user.id;

                authService.isAdmin(userId).then(isAdmin => {
                    setIsAdmin(isAdmin);
                }).catch(error => {
                    notifyService.error("Failed to verify admin status: " + error.message);
                    setIsAdmin(false);
                });
            } catch (error) {
                notifyService.error("Invalid token or token expired");
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
    }, []);

    if (isAdmin === null) {
        return null; // or a loading spinner, if preferred
    }

    return isAdmin ? <Outlet /> : <Navigate to="/page404" replace />;
};

export default AdminRoute;
