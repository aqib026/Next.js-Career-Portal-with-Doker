import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../../context/AuthContext";
import { adduser } from "../../redux/userReducer";
import SideBar from "../Layout/SideBar";
import Body from "../Layout/Body";
import DashboardModal from "../../components/Modals/ParentModal";

const Users = () => {
  const { logout } = useAuth();
  const userData = useSelector((state) => state.user.userData);
  const [page, setPage] = useState(1)
 const [updatedData, setUpdatedData] = useState();

  const handleLogout = async () => {
    try {
      await logout();

    } catch (err) { }
  };
  const handlePage = (pageNumber) => {
    setPage(pageNumber)
 }

  return (
    <div id="dashboard-bg">
      <div className="container-fluid">
        <div className="row">
          <SideBar handleLogout={handleLogout} type={userData.data.is_admin} />

          <Body handlePage={handlePage} pagenum={page} />
  </div>
      </div>
      <div
        className="modal fade bd-example-modal-lg"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <DashboardModal updatedData={updatedData} />
      </div>
    </div>
  );
};

export default Users;
