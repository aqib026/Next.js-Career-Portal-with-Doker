import React from "react";
import Image from "next/future/image";
import { webLogo } from "../public/assets/images";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light white webNone space-between mobileFlex">
      <a className="navbar-brand" href="#">
        <Image layout="raw" className="mobileVQ" src={webLogo} alt="" />
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
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto mt-4">
          <li className="nav-item">
            <a className="nav-link" href="users.html">
              <i className="fa-solid fa-user topbar-icon"></i>Users{" "}
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="job-post.html">
              <i className="fa-solid fa-bars-progress topbar-icon"></i>Job Post
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa-solid fa-box topbar-icon"></i>Assignments
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa-solid fa-chalkboard-user topbar-icon"></i>Job
              Applications
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa-solid fa-user topbar-icon"></i>Profile
            </a>
          </li>
        </ul>
        <a href="sign-in.html">
          <button type="button" className="btn btn-danger logoutMobile">
            <i className="fa-solid fa-right-from-bracket mr-2"></i>Logout
          </button>
        </a>
      </div>
    </nav>
  );
}
