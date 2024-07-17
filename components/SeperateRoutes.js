

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import { useAuth } from "../context/AuthContext";
import { setUserLoginToken } from "../redux/userReducer";
import { auth } from "../config/firebase"

const SeperateRoute = ({ children }) => {

    const { user } = useAuth();
    const router = useRouter();
    const userData = useSelector((state) => state.user.userData);
    const adminRoutes = ["/users", "/jobPosts", "/assignment", "/jobApplications"];
    const userRoutes = ["/UserHome", "/solveAssessment" ,"/uploadResume"];

    useEffect(() => {
        if (user) {
            if(userData.data.is_admin == true)
            {
                if(userRoutes.includes(router.pathname)){
                    router.push("/users")
                }
            }
            else {
                if(adminRoutes.includes(router.pathname)){
                    if(userData.data.resume != "")
                    {
                        router.push("/UserHome")

                    }
                    else {
                        router.push("/uploadResume");

                    }
                }
            }
        }

    }, [router.pathname, user])
if(userData.data.is_admin == false)
{
    return <>{adminRoutes.includes(router.pathname) ? null : children}</>

}
    else
    {
        return <>{userRoutes.includes(router.pathname) ? null : children}</>

    }

};

export default SeperateRoute;
