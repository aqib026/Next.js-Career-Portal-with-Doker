import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/future/image";
import Link from "next/link";

import {
  addJob,
  updateJob,
  addAssignment,
  updateAssignment,
  adduser,
  updateUser,
  setUserUpdatedData,
} from "../../redux/userReducer";

import {
  webLogo,
  profileImage,
  createJobVector,
  addUserVector,
  assignmentModalVector,
} from "../../public/assets/images/index";

export default function DashboardModal({ assignments }) {
  const updatedData = useSelector((state) => state.user.updatedData);
  const router = useRouter();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    evaluations: "",
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    input: "",
    output: "",
    language: "",
  });
  const [status, setStatus] = "";

  useEffect(() => {
    const pathName = router.pathname;

    if (updatedData) {
      if (pathName == "/users") {
        setUserData({
          ...userData,
          name: updatedData.name,
          email: updatedData.email,
          phoneNumber: updatedData.phoneNumber,
        });
      } else if (pathName == "/assignment") {
        setAssignmentData({
          ...assignmentData,
          title: updatedData.title,
          description: updatedData.description,
          input: updatedData.input,
          output: updatedData.output,
          language: updatedData.language,
        });
      } else {
        setJobData({
          ...jobData,
          title: updatedData.title,
          description: updatedData.description,
          evaluations: updatedData.evaluations,
        });
      }
    }
  }, [updatedData, jobData, assignmentData, userData, router.pathname]);

  const dispatch = useDispatch();
  const pathName = router.pathname;

  const saveJobPost = () => {
    if (updatedData) {
      dispatch(
        updateJob(
          JSON.stringify({
            id: updatedData.id,
            title: jobData.title,
            description: jobData.description,
            evaluations: jobData.evaluations,
          })
        )
      );
    } else {
      dispatch(addJob(JSON.stringify(jobData)));
    }
    reset();
  };
  const saveAssignemnt = () => {
    if (updatedData) {
      dispatch(
        updateAssignment(
          JSON.stringify({
            id: updatedData.id,
            title: assignmentData.title,
            description: assignmentData.description,
            input: assignmentData.input,
            output: assignmentData.output,
            language: assignmentData.language,
          })
        )
      );
    } else {
      dispatch(addAssignment(JSON.stringify(assignmentData)));
    }
    reset();
  };

  const saveUser = () => {
    if (updatedData) {
      dispatch(
        updateUser(
          JSON.stringify({
            id: updatedData.id,
            name: userData.name,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
          })
        )
      );
    } else {
      dispatch(adduser(JSON.stringify(userData)));
    }
    reset();
  };

  const reset = () => {
    setJobData({
      ...jobData,
      title: "",
      description: "",
      evaluations: "",
    });
    setAssignmentData({
      ...assignmentData,
      title: "",
      description: "",
      input: "",
      output: "",
      language: "",
    });
    setUserData({
      ...userData,
      name: "",
      email: "",
      phoneNumber: "",
    });
    dispatch(setUserUpdatedData(""));
  };
  return (
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-content-padding">
          {pathName == "/users" ? (
            <div className="row">
              <div className="col-lg-6">
                <div className="addUser-heading">
                  <h2>{status}</h2>
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="addUser-label"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    className="form-control addUser-input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter name"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        name: e.target.value,
                      })
                    }
                    value={userData.name ? userData.name : ''}
                  />
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="addUser-label"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control addUser-input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        email: e.target.value,
                      })
                    }
                    value={userData.email ? userData.email : ''}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="addUser-label"
                  >
                    Phone Number
                  </label>
                  <input
                    type="email"
                    className="form-control addUser-input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter phone"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        phoneNumber: e.target.value,
                      })
                    }
                    value={userData.phoneNumber ? userData.phoneNumber : ''}
                  />
                </div>
              </div>
              <div className="col-lg-6 align-center">
                <Image
                  layout="raw"
                  className="w-100 mobile-mt"
                  src={addUserVector}
                  alt=""
                />
              </div>
            </div>
          ) : pathName == "/assignment" ? (
            <div className="row">
              <div className="col-lg-6">
                <div className="addUser-heading">
                  <h2>Create new assignment</h2>
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="addUser-label"
                  >
                    Title
                  </label>
                  <input
                    type="name"
                    className="form-control addUser-input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter title"
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        title: e.target.value,
                      })
                    }
                    value={assignmentData.title ? assignmentData.title : ''}
                  />
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="addUser-label"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control job-textarea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Write..."
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        description: e.target.value,
                      })
                    }
                    value={assignmentData.description ? assignmentData.description : ''}
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="addUser-label bold"
                    >
                      Add Test Cases
                    </label>
                  </div>
                  <div className="col-lg-6 casesFlex">
                    <button
                      type="button"
                      className="btn btn-primary addTestCases-btn"
                    >
                      Add
                    </button>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-4">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="addUser-label"
                      >
                        Input
                      </label>
                      <input
                        type="name"
                        className="form-control addUser-input"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter input"
                        onChange={(e) =>
                          setAssignmentData({
                            ...assignmentData,
                            input: e.target.value,
                          })
                        }
                        value={assignmentData.input ? assignmentData.input : ''}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-4">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="addUser-label"
                      >
                        Output
                      </label>
                      <input
                        type="name"
                        className="form-control addUser-input"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter output"
                        onChange={(e) =>
                          setAssignmentData({
                            ...assignmentData,
                            output: e.target.value,
                          })
                        }
                        value={assignmentData.output ? assignmentData.output : ''}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="addUser-label"
                  >
                    Language
                  </label>
                  <div className="dropdown evaluationsHold">
                    <button
                      className="btn btn-secondary dropdown-toggle evaluations-dropdown"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Select Language
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() =>
                          setAssignmentData({
                            ...assignmentData,
                            language: "PHP",
                          })
                        }
                      >
                        PHP
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() =>
                          setAssignmentData({
                            ...assignmentData,
                            language: "JavScript",
                          })
                        }
                      >
                        JavaScript
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 align-center">
                <Image className="w-100" src={assignmentModalVector} alt="" />
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-6">
                <div className="addUser-heading">
                  <h2>Create new job</h2>
                </div>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="form-group mb-4">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="addUser-label"
                      >
                        Job Title
                      </label>
                      <input
                        type="name"
                        className="form-control addUser-input"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter title"
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            title: e.target.value,
                          })
                        }
                        value={jobData.title ? jobData.title : ''}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="addUser-label"
                      >
                        Label
                      </label>
                      <div className="labelBox">
                        <div className="labelColor"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="addUser-label"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control job-textarea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Write..."
                    onChange={(e) =>
                      setJobData({
                        ...jobData,
                        description: e.target.value,
                      })
                    }
                    value={jobData.description ? jobData.description : ''}
                  ></textarea>
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="addUser-label"
                  >
                    Evaluations
                  </label>
                  <div className="dropdown evaluationsHold">
                    <button
                      className="btn btn-secondary dropdown-toggle evaluations-dropdown"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Select Evaluations
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {assignments ? (
                        <>
                          {assignments.map((item) => {
                            return (
                              <a
                                key={item.title}
                                className="dropdown-item"
                                onClick={() =>
                                  setJobData({
                                    ...jobData,
                                    evaluations: item.title,
                                  })
                                }
                              >
                                {item.title}
                              </a>
                            );
                          })}
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              setJobData({
                                ...jobData,
                                evaluations: "Ensure",
                              })
                            }
                          >
                            Ensure{" "}
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              setJobData({
                                ...jobData,
                                evaluations: "Even Number",
                              })
                            }
                          >
                            Even Number{" "}
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              setJobData({
                                ...jobData,
                                evaluations: "Ensure",
                              })
                            }
                          >
                            Ensure{" "}
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              setJobData({
                                ...jobData,
                                evaluations: "Even Number",
                              })
                            }
                          >
                            Even Number{" "}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 align-center">
                <Image className="w-100" src={createJobVector} alt="" />
              </div>
            </div>
          )}
          <div className="col-lg-12 flex-end">
            <button
              type="button"
              className="btn btn-primary modal-addUser-btn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() =>
                pathName == "/users"
                  ? saveUser()
                  : pathName == "/assignment"
                  ? saveAssignemnt()
                  : saveJobPost()
              }
            >
              <i className="fa-solid fa-check mr-2"></i>
              {updatedData ? "Update" : "Post"}
            </button>
            <button
              type="button"
              className="btn btn-primary modal-cancel-btn ml-2"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark mr-2">
                
              </i>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
