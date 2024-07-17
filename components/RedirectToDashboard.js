import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import { useAuth } from "../context/AuthContext";

const RedirectToDashboard = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const userData = useSelector((state) => state.user.userData);
  window.onpopstate = e => {
    if(user) {
      if(userData.data.is_admin == true)
      {
        router.push("/users");
      }
      else {
        if(userData.data.resume != "")
        {
          router.push("/UserHome");

        }
        else
        {
          router.push("/uploadResume");

        }
      }
    }  };
  useEffect(() => {
    {
      if(user) {
        if(userData.data.is_admin == true)
        {
          router.push("/users");
        }
        else {
          if(userData.data.resume != "")
          {
            router.push("/UserHome");


          }
          else
          {
            router.push("/uploadResume");

          }
        }
      }

    }
  }, [router, user]);

  return <>{user ? null : children}</>;
};

export default RedirectToDashboard;
