import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Animals from "./pages/animal/Animals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shelters from "./pages/shelter/Shelters";
import Volunteerings from "./pages/volunteering/Volunteerings";
import OneAnimal from "./pages/animal/OneAnimal";
import OneShelter from "./pages/shelter/OneShelter";
import AdminUsers from "./pages/admin/AdminUsers";
import VolunteeringApplications from "./pages/volunteering/VolunteeringApplications";
import AnimalApplications from "./pages/animal/AnimalApplications";
import Login from "./pages/login/Login";


const Logout = () => {
    useEffect(() => {
        console.log("logout");
        localStorage.clear();
        window.location.href = '/login';
    }, []);

    return null;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Animals />,
            },
            {
                path: "/animals",
                element: <Animals />,
            },
            {
                path: "/animals/:id",
                element: <OneAnimal />,
            },
            {
                path: "/animal-applications/:id",
                element: <AnimalApplications />,
            },
            {
                path: "/shelters",
                element: <Shelters />,
            },
            {
                path: "/shelters/:id",
                element: <OneShelter />,
            },
            {
                path: "/volunteerings",
                element: <Volunteerings />,
            },
            {
                path: "/volunteering-applications/:id",
                element: <VolunteeringApplications />,
            },
            {
                path: "/admin",
                element: <AdminUsers />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/logout", //go to /logout to logout
                element: <Logout />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);

// to start write in terminal : export NODE_OPTIONS=--openssl-legacy-provider
// and write: npm start
