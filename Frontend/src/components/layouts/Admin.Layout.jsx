import React, { useState, useEffect } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useToken } from "../../store/tokenDistributor";

export const AdminLayout = () => {
    const { isLoading, user, ensureAdminExists } = useToken();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (user) {
            ensureAdminExists();

            if (!user.isAdmin) {
                setShouldRedirect(true);
            }
        }
    }, [user, ensureAdminExists]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (shouldRedirect || !user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/admin/home">
                                    <FaHome /> Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/users">
                                    <FaUser />
                                    Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts">
                                    <FaMessage />
                                    Contacts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/services">
                                    <FaRegListAlt /> Services
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
};
