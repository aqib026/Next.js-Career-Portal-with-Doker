import React ,{useState}from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import DashboardModal from "../../components/Modals/ParentModal";
import SideBar from "../Layout/SideBar";
import Body from "../Layout/Body";

const Assignment = () => {
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
        <DashboardModal />
      </div>
    </div>
  );
};

export default Assignment;
