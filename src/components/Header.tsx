import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import LoginService from "../services/LoginService";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState<null|string>();
    const navigate = useNavigate();

    useEffect(() => {
        const role = LoginService.getRole();
        const userEmail = LoginService.getEmail();
        setIsAuthenticated(!!userEmail);  // Checks if there's an email indicating the user is logged in
        setIsAdmin(role?.toUpperCase() === 'ADMIN'); // Checks if the user role is admin
        setEmail(userEmail)
        console.log(role, userEmail)
        const items = { ...localStorage };
        console.log(items)
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Clear all user data from local storage
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white border-b px-12 py-2 z-10">
            <nav className="flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li>
                        <NavLink  to="/animals" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition">
                            Тварини
                        </NavLink>
                    </li>
                    <li>
                        <NavLink  to="/volunteerings" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition">
                            Волонтерства
                        </NavLink>
                    </li>
                    <li>
                        <NavLink  to="/shelters" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition">
                            Притулки
                        </NavLink>
                    </li>
                    {isAdmin && (
                        <li>
                            <NavLink to="/admin" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition">
                                Користувачі
                            </NavLink>
                        </li>
                    )}
                </ul>
                {isAuthenticated ? (
                    <div>
                        <span className='text-xs font-semibold mr-2'>{email}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-700"
                        >
                            Вихід
                        </button>
                    </div>
                ) : (
                    <NavLink
                        to="/login"
                        className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Вхід
                    </NavLink>
                )}
            </nav>
        </header>
    );
};

export default Header;
