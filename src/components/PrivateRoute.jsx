import { Navigate, Outlet } from "react-router-dom"
import {useAuthHook} from "../Hooks/useAuthHook.js";
import { useSelector } from "react-redux";

function PrivateRoute()
{
    const userDetails = useSelector(state => state);
    console.log(userDetails);
    return userDetails ? <Outlet/> : <Navigate to="/profile/signin"/>
}

export default PrivateRoute;