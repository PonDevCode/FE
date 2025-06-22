import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AdminMain from '../../../pages/Admin/AdminManin';

const PrivateRoute = () => {
    //   const isLoggedIn = !!localStorage.getItem('token'); // hoặc lấy từ context/store
    const status = useSelector((state) => state.auth?.login?.currentUser)
    if (!status) {
        // Nếu chưa đăng nhập, chuyển về trang login
        return <Navigate to="/login" replace />;
    }
    // Nếu đã login thì render component con (admin page)
    return <AdminMain />;
};

export default PrivateRoute;
