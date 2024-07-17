import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../../context/AuthContext";
import { useGetAllApplicationsQuery } from "../../redux/applications/applicationsAPI";
import SideBar from "../Layout/SideBar";
import Body from "../Layout/Body";

const JobApplication = () => {
  useGetAllApplicationsQuery({refetchOnMount: true});
  const { logout } = useAuth();
  const userData = useSelector((state) => state.user.userData);
  const [page, setPage] = useState(1)

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {}
  };
  const handlePage = (pageNumber) => {
    setPage(pageNumber)
}
  return (
    <div id="dashboard-bg">
      <div className="container-fluid">
        <div className="row">
          <SideBar handleLogout={handleLogout} type={userData.data.is_admin} />
        </div>
      </div>
      <Body handlePage={handlePage} pagenum={page}/>
    </div>
);
};

export default JobApplication;
