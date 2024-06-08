import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../auth/login/Login';
import Signup from '../../auth/signup/Signup';
import Home from '../../userPage/userPage/Home';
import Page404 from '../page404/Page404';
import ProtectedRoute from './ProtectedRoute';
import AddVacation from '../../adminPage/addVacation/AddVacation';
import EditVacation from '../../adminPage/editVacation/EditVacation';
import AdminRoute from './AdminRoute';
import AdminPage from '../../adminPage/adminPage/AdminPage';
import VacationReport from '../../adminPage/vacationReport/VacationReport';
import UnauthenticatedRoute from './AuthenticatedRoute'; // Import the UnauthenticatedRoute component

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<UnauthenticatedRoute />}>
                <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
            </Route>
            <Route element={<AdminRoute />}>
                <Route path="/adminPage" element={<AdminPage />} />
                <Route path="/adminPage/add" element={<AddVacation />} />
                <Route path="/adminPage/edit/:vacationId" element={<EditVacation />} />
                <Route path="/adminPage/chart" element={<VacationReport />} />
            </Route>
            <Route path="/page404" element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default Routing;
