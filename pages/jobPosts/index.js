import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../../context/AuthContext";
import { addJob } from "../../redux/userReducer";

import DashboardModal from "../../components/Modals/ParentModal";
import SideBar from "../Layout/SideBar";
import Body from "../Layout/Body";

const JobPost = () => {
  const assignments = useSelector((state) => state.user.assignments);
  const userData = useSelector((state) => state.user.userData);
  const [page, setPage] = useState(1)

  const { logout } = useAuth();

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

      <div
        className="modal fade bd-example-modal-lg"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <DashboardModal assignments={assignments} />
      </div>
    </div>
  );
};

export default JobPost;
