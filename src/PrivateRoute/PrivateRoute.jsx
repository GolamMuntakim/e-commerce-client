import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";


const PrivateRoute = ({children}) => {
const {user, loading} = useContext(AuthContext)
// const location = useLocation()
if(loading) return <div className="min-h-screen w-full flex items-center justify-center"><span className="loading loading-infinity loading-lg"></span></div>
if(user) return children
    return <Navigate to="/login"  replace={true}></Navigate>
};

export default PrivateRoute;