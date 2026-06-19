import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const isLogged = localStorage.getItem('isLoggedIn') === 'true';
    if (isLogged) {
        return children;
    }else {
        return <Navigate to="/login" replace />
    }
}

export default ProtectedRoute
