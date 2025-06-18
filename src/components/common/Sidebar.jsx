import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth';

function Sidebar() {
    const { logout } = useContext(AdminAuthContext);
    return (
        <div className="card shadow mb-5 sidebar">
            <div className="card-body">
                <ul>
                    <li>
                        <a href="">Dashboard</a>
                    </li>
                    <li>
                        <a href="">Categories</a>
                    </li>
                    <li>
                        <a href="">Brands</a>
                    </li>
                    <li>
                        <a href="">Products</a>
                    </li>
                    <li>
                        <a href="">Orders</a>
                    </li>
                    <li>
                        <a href="">Users</a>
                    </li>
                    <li>
                        <a href="">Shipping</a>
                    </li>
                    <li>
                        <a href="">Change Password</a>
                    </li>
                    <li>
                        <a href="" onClick={logout}>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
