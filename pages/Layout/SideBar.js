import React from "react";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { webLogo, profileImage } from "../../public/assets/images";
import { useAuth } from "../../context/AuthContext";

export default function SideBar({ type }) {
  const router = useRouter();
  const userData = useSelector((state) => state.user.userData);
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {}
  };
  return (
    <div className="sidebar mobile-none">
      <div className="space-between" onClick={() => router.push('/')}>
        <Image layout="raw" className="logo" src={webLogo} alt="Logo" />
      </div>
      <div className="flex-center">
        <div className="d-flex">
          <img
            layout="raw"
           
            className="profileImg"
            src={userData.data.profilePicture  ? `/uploads/${userData.data.profilePicture}` :  profileImage}
            height= {70}
            width= {63}
            alt="Profile Image"
          />
          <div className="online"></div>
        </div>
        
      </div>
      <div className="profileName">
        <h6 className="elipsesText">
          {userData.data.first_name} {userData.data.last_name}
        </h6>
        <h6 className="elipsesText">
          <span>{userData.data.headline}</span>
        </h6>
      </div>
      <div className="space-between">
        <button
          type="button"
          className="btn btn-primary setting-btn"
          onClick={() => router.push("/myProfile")}
        >
          <i className="fa-solid fa-user mr-2"></i> Profile
        </button>
        <a>
          <button
            type="button"
            className="btn btn-primary logout-btn"
            onClick={() => handleLogout()}
          >
            <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> Logout
          </button>
        </a>
      </div>
      <div className="nav-bg ">
        {type == true ? (
          <ul className="navbar-nav">
            <li className="nav-item" onClick={() => router.push("/users")}>
              <a className={router.pathname == '/users' ? "nav-link active" : "nav-link"}>
                <i className="fa-solid fa-user topbar-icon"></i> Users{" "}
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item" onClick={() => router.push("/jobPosts")}>
            <a className={router.pathname == '/jobPosts' ? "nav-link active" : "nav-link"}>
                <i className="fa-solid fa-bars-progress topbar-icon"></i> Job
                Post
              </a>
            </li>
            <li className="nav-item" onClick={() => router.push("/assignment")}>
            <a className={router.pathname == '/assignment' ? "nav-link active" : "nav-link"}>
                <i className="fa-solid fa-box topbar-icon"></i> Assignments
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => router.push("/jobApplications")}
            >
              <a className={router.pathname == '/jobApplications' ? "nav-link active" : "nav-link"}>
                <i className="fa-solid fa-chalkboard-user topbar-icon"></i>Job
                Applications
              </a>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item borderBottom" onClick={() => router.push('/UserHome')}>
              <a className="nav-link active" >
                <i className="fa-solid fa-user topbar-icon"></i> My Applications{" "}
                <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
