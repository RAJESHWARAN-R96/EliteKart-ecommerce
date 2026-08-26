import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextInstance';

const ProtectedRoute = ({ children, adminToken }) => {
    const { token } = useContext(ShopContext);
    const location = useLocation();

    // If neither customer token nor admin token is present, redirect to /login
    if (!token && !adminToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
