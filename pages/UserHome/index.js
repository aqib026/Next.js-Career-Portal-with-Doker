import React, { useRef, useEffect } from "react";
import Image from "next/future/image";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "@reduxjs/toolkit";
import { useCreateApplicationMutation, useGetApplicationByUserIdQuery } from '../../redux/applications/applicationsAPI';

import {
  myApplicationVector,
  resumeIcon,
  webLogo,
} from "../../public/assets/images";
import SideBar from "../Layout/SideBar"
import { useAuth } from "../../context/AuthContext"
import AppliedJob from "../../components/UserHome/AppliedJob";

export default function UserHome() {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const appliedJob = useGetApplicationByUserIdQuery(userData.id, { refetchOnMountOrArgChange: true });
  const { logout } = useAuth();
  const [createApplication] = useCreateApplicationMutation();
  const applicationDraft = useSelector((state) => state.applications.applicationDraft);
  const addApplication = createAction('ADD_APPLICATION');
  const addApplicationRef = useRef(false);
  
  useEffect(() => {
    if (addApplicationRef.current) return;
    addApplicationRef.current = true;
    if (Object.keys(applicationDraft).length != 0) {
      const data = {
        ...applicationDraft,
        userId: userData.data
      }
      createApplication(data)
      .unwrap()
      .then(() => {
        dispatch(addApplication({}));
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) { }
  };
  
  const showMyImage = (file) => {
    window.open(`/uploads/${userData.data.resume}`, "Window Title", "width=500, height=450");
  }
  
  return (
    <div id="dashboard-bg">
      <div className="container-fluid">
        <div className="row">
          <SideBar handleLogout={handleLogout} type={userData.data.is_admin} />

          <div className="col-lg-12 p-0 mainPadding">
            <nav className="navbar navbar-expand-lg navbar-light white webNone space-between mobileFlex">
              <a className="navbar-brand" href="#">
                <Image className="mobileVQ" src={webLogo} alt="" />
              </a>
              <div>
                <i className="fa-solid fa-bell bell mt-6 mr-3"></i>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto mt-4">
                  <li className="nav-item">
                    <a className="nav-link active" href="my-applications.html">
                      <i className="fa-solid fa-user topbar-icon"></i>My
                      Applications<span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="profile.html">
                      <i className="fa-solid fa-user topbar-icon"></i>Profile
                    </a>
                  </li>
                </ul>
                <a href="sign-in.html">
                  <button type="button" className="btn btn-danger logoutMobile">
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                    Logout
                  </button>
                </a>
              </div>
            </nav>
            <div className="topbar mobile-none">
              <div className="row">
                <div className="col-lg-12 topbarFlex">
                  <i className="fa-solid fa-bell bell mt-6"></i>
                </div>
              </div>
            </div>
            <div id="main">
              <div className="row">
                <div className="col-lg-6 col-xl-7">
                  <div className="space-between align-center mobileUnflex">
                    <div className="heading mb-4">
                      <h5>Overview</h5>
                      <h4>My Applications</h4>
                    </div>
                  </div>
                  <div className="myAppHeading">
                    <h1>Make the best move to choose your new job</h1>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-5 d-flex align-center flex-end">
                  <Image
                    className="myApplicationVector"
                    src={myApplicationVector}
                    alt=""
                  />
                </div>
                <AppliedJob appliedJob={appliedJob}/>
                <div className="col-lg-4 mt-5">
                  <div className="box resumeVector applicationSideBox">
                    <div className="box-padding">
                      <div className="heading">
                        <h2>Resume</h2>
                        <h6>File format Pdf, doc</h6>
                      </div>
                      <div className="resumeBox">
                        <div>
                          <label htmlFor="exampleInputEmail1">
                            Last Uploaded File
                          </label>
                        </div>
                        <div className="d-flex mt-2 align-center space-between">
                          <div className="d-flex align-center">
                            <Image src={resumeIcon} alt="" />
                            <div className="profileName">
                              <h4 className="elipsesText">{userData.data.resume}</h4>
                            </div>
                          </div>
                          <i className="fa-solid fa-eye viewIcon" onClick={() => showMyImage()} ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
