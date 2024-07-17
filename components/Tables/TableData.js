import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/future/image";
import Swal from "sweetalert2";


import {
  setUserUpdatedData,
} from "../../redux/userReducer";
import { profileImage } from "../../public/assets/images";
import { useUpdateApplicationMutation, useDeleteApplicationMutation } from "../../redux/applications/applicationsAPI";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/users/Services";
import {
  useDeleteJobPostMutation,
  useUpdateJobPostMutation,
} from "../../redux/jobPosts/Services";
import {
  useDeleteAssessmentMutation,
  useUpdateAssessmentMutation,
  useGetAssessmentByIdQuery
} from "../../redux/assesments/Services";

export default function TableData({ item, mykey, pathName }) {
  const [deleteUser, deleteInfo] = useDeleteUserMutation();
  const [updateUser, updateInfo] = useUpdateUserMutation();
  const [deleteJobPost, deleteJobInfo] = useDeleteJobPostMutation();
  const [updateJobPosted, updateJobInfo] = useUpdateJobPostMutation();
  const [deleteAssessment, deleteAssesmentInfo] = useDeleteAssessmentMutation();
  const [updateAssessment, updateAssesmentInfo] = useUpdateAssessmentMutation();
  const [updateApplication, updateApplicationInfo] = useUpdateApplicationMutation();
  const [deleteApplication, deleteApplicationInfo] = useDeleteApplicationMutation();


  
  const Delete = (id, func, text) => {

    Swal.fire({
      title: 'Are you sure?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00345d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isDismissed == false) {
        func(id)

      }
    })
  }
  const updateUserAdminStatus = (item) => {
    const val = { ...item, is_admin: item.is_admin == true ? false : true };
    const updateUserData = { id: item._id, data: val };
    updateUser(updateUserData);
  };

  const updateJobHiddenStatus = (item) => {
    const jobData = { ...item, isHiddein: item.isHiddein == true ? false : true };
    const updateJobPost = { id: item._id, data: jobData };
    updateJobPosted(updateJobPost)
  };


  const updateAssessmentHiddenStatus = (item) => {
    const assessmentData = { ...item, isHiddein: item.isHiddein == true ? false : true };
    const updateAssesment = { id: item._id, data: assessmentData };
    updateAssessment(updateAssesment);
  };
  const updateApplicationStatus = (item, status) => {
    const applicationData = { ...item, applicationStatus: status };
    const updateAssesment = { id: item._id, data: applicationData };
    updateApplication(updateAssesment);
  };
  const sendmail = async (item) => {

    fetch("/api/mail", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.userId[0].first_name,
        email: item.userId[0].email,
        text: 'text',
      }),
    }).then((res) => {
      res.status === 200
        ?
        console.log()
        :
        console.log()
    })
  }
  const dispatch = useDispatch();

  const checkStatue = (val) => {
    switch (val) {
      case "Pending":
        return "pending";
      case "Pass":
        return "pass";
      case "Fail":
        return "fail";
      default:
        return "";
    }
  }
  return (
    <tr key={mykey}>
      {pathName == "/assignment" ? (
        <>
          <td >
            <div className="nowrap w20px">
              {item.title}
            </div>
          </td>
          <td>
            <div className="nowrap w170px">{item.description}</div>
          </td>
          <td>{item.test_cases.length}</td>
          <td>
            <div className="nowrap w30px">
              {item.language}
            </div>
          </td>
        </>
      ) : pathName == "/jobPosts" ? (
        <>
          <td>
            <div className="d-flex align-center">
              <div className="circle color2 mr-3 nowrap w50px"></div>
              {item.title}{" "}
            </div>
          </td>
          <td>
            <div className="nowrap w170px">{item.description} </div>
          </td>
          <td>
            <div className="nowrap w70px">
              {item.assessmentId[0]?.title}
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="layoutRow">
            <Image
              layout="raw"
              className="table-Profile mr-2"
              src={item.profilePicture ? `/uploads/${item.profilePicture}` : profileImage}
              height={70}
              width={63}
              alt=""
            />{" "}
            <div className="elipses">
              {pathName == '/jobApplications' ? <>{item.userId[0]?.first_name} {item.userId[0]?.Last_name}</> : <> {item.first_name} {item.Last_name}</>}

            </div>
          </td>
          {pathName == "/users" ? (
            <>
              <td>
                <div className="elipses">

                  {item.email}

                </div></td>
              <td>
                <div className="elipses">

                  {item.phone}

                </div></td>
            </>
          ) : pathName == "/jobApplications" ? (
            <>
              <td>{item.jobPostId[0]?.title}</td>
              <td>
                <div
                  className={`casesStatus ${checkStatue(item.evaluationStatus)}`}
                >
                  {item.evaluationStatus}
                </div>
              </td>
              <td>
                <div

                  className={`casesStatus ${checkStatue(item.applicationStatus)}`}
                >
                  {item.applicationStatus}
                </div>
              </td>
            </>
          ) : null}
        </>
      )}

      <td>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle actionDD"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {pathName == "/jobApplications" ? 'Action' : 'Show'}
          </button>
          {pathName == "/users" ? (
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item">Show</a>

              <button
                className="dropdown-item"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
                onClick={() => {
                  dispatch(setUserUpdatedData(item));
                }}
              >
                Edit
              </button>
              <a className="dropdown-item" onClick={() => Delete(item._id,deleteUser,'User would be permanently deleted')}>
                Delete
              </a>
            </div>
          ) : pathName == "/jobApplications" ? (
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {item.applicationStatus != 'Pass' ?
                <a className="dropdown-item" onClick={() => { sendmail(item); updateApplicationStatus(item, 'Pass') }}
                >Approve</a> : null}
              { }{item.applicationStatus != 'Fail' ?
                <a className="dropdown-item" onClick={() => updateApplicationStatus(item, 'Fail')}>Reject</a>
                :
                null}
              <a className="dropdown-item" onClick={() => Delete(item._id,deleteApplication,'Application would be permanently deleted')}>
              Delete</a>
            </div>
          ) : pathName == "/assignment" ? (
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

              <button
                className="dropdown-item"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
                onClick={() => {
                  dispatch(setUserUpdatedData(item));
                }}
              >
                Edit
              </button>
              <a
                className="dropdown-item"
                onClick={() => Delete(item._id,deleteAssessment,'Assessment would be permanently deleted')  }            >
                Delete
              </a>
            </div>
          ) : (
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Show
              </a>
              <button
                className="dropdown-item"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
                onClick={() => {
                  dispatch(setUserUpdatedData(item));
                }}
              >
                Edit
              </button>
              <a
                className="dropdown-item"
                onClick={() => Delete(item._id,deleteJobPost,'Job would be permanently deleted') }             >
                Delete
              </a>
            </div>
          )}
        </div>
      </td>
      {pathName != "/jobApplications" && pathName != "/assignment" ?
        <td>
          <label className="switch">
            <input
              type="checkbox"
              defaultChecked={pathName == '/users' ? item.is_admin : item.isHiddein}
              onChange={() => pathName == '/users' ? updateUserAdminStatus(item) : pathName == '/jobPosts' ? updateJobHiddenStatus(item) : updateAssessmentHiddenStatus(item)}
            />
            <span className="slider"></span>
          </label>

        </td>
        :
        null}


    </tr>
  );
}