import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard";


import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
// User Profile
import UserProfile from "../pages/Authentication/user-profile";


const authProtectedRoutes = [
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/index", component: <Dashboard /> },

    //User Profile
    { path: "/profile", component: <UserProfile /> },

    // this route should be at the end of all other routes
    // eslint-disable-next-line react/display-name
    {
        path: "/",
        exact: true,
        component: <Navigate to="/dashboard" />,
    },
    { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
    // Authentication Page
    { path: "/logout", component: <Logout /> },
    { path: "/login", component: <Login /> },
    { path: "/forgot-password", component: <ForgetPasswordPage /> },
    { path: "/register", component: <Register /> },


    { path: "/auth-404-basic", component: <Basic404 /> },
    { path: "/auth-404-cover", component: <Cover404 /> },
    { path: "/auth-404-alt", component: <Alt404 /> },
    { path: "/auth-500", component: <Error500 /> },
    { path: "/auth-offline", component: <Offlinepage /> },

];

export { authProtectedRoutes, publicRoutes };