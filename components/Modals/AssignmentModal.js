import React from "react";
import { assignmentModalVector } from "../../public/assets/images/index";
import Image from "next/future/image";

export default function AssignmentModal({
  testCaseStatus,
  updateTestCase,
  setTestCaseStatus,
  addTestCase,
  update,
  setUpdatedIndex,
  setTestCasesData,
  testCasesData,
  testCasesList,
  setAssignmentData,
  assignmentData,
}) {
  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="addUser-heading">
          <h2>Create new assignment</h2>
        </div>
        <div className="assignmentScroll scrollbar" id="style-1">
          <div className="form-group mb-4">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
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
            />{" "}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
              Time Limit
            </label>
            <input
              type="name"
              className="form-control addUser-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter time"
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  timeDuration: e.target.value,
                })
              }
              value={assignmentData.timeDuration ? assignmentData.timeDuration : ''}
            />{" "}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
              Test run
            </label>
            <input
              type="name"
              className="form-control addUser-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter test run"
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  testRun: e.target.value,
                })
              }
              value={assignmentData.testRun ? assignmentData.testRun  : ''}
            />{" "}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
              Function
            </label>
            <input
              type="name"
              className="form-control addUser-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter function"
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  function: e.target.value,
                })
              }
              value={assignmentData.function ? assignmentData.function : ''}
            />{" "}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
              Comments
            </label>
            <textarea
              className="form-control job-textarea"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Comments..."
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  comments: e.target.value,
                })
              }
              value={assignmentData.comments ? assignmentData.comments : ''}
            ></textarea>{" "}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
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
            ></textarea>{" "}
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
                onClick={() =>
                  testCaseStatus == "Add" ? addTestCase() : update()
                }
              >
                {testCaseStatus}
              </button>{" "}
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1" className="addUser-label">
                  Input
                </label>
                <input
                  type="name"
                  className="form-control addUser-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter input"
                  onChange={(e) =>
                    setTestCasesData({
                      ...testCasesData,
                      input: e.target.value,
                    })
                  }
                  value={testCasesData.input ? testCasesData.input: ''}
                />{" "}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1" className="addUser-label">
                  Output
                </label>
                <input
                  type="name"
                  className="form-control addUser-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter expectedOutput"
                  onChange={(e) =>
                    setTestCasesData({
                      ...testCasesData,
                      expectedOutput: e.target.value,
                    })
                  }
                  value={testCasesData.expectedOutput ? testCasesData.expectedOutput : ''}
                />{" "}
              </div>
            </div>
            <div className="col-lg-12 mb-4">
              <div className="box modalList">
                {testCasesList ? (
                  <>
                    {testCasesList.length > 0 ? (
                      <table className="table table-striped mt-4 table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">Input</th>
                            <th scope="col">Output</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {testCasesList.map((item, index) => {
                            return (
                              <tr key={item.input}>
                                <td>{item.input}</td>
                                <td>{item.expectedOutput}</td>
                                <td>
                                  <i
                                    className="fa-solid fa-pen-to-square editColor"
                                    onClick={() => {
                                      setUpdatedIndex(index);
                                      updateTestCase(item, index);
                                      setTestCaseStatus("Update");
                                    }}
                                  ></i>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
              Language
            </label>
            <div className="dropdown evaluationsHold">
              {assignmentData.language != "" ?

                <button

                  className="btn btn-secondary dropdown-toggle evaluations-dropdown darkColor"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {assignmentData.language}
                </button>
                :
                <button

                  className="btn btn-secondary dropdown-toggle evaluations-dropdown lightColor"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Select Language
                </button>}
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a
                  className="dropdown-item"
                  onClick={() =>
                    setAssignmentData({
                      ...assignmentData,
                      language: "php",
                    })
                  }
                >
                  php
                </a>
                <a
                  className="dropdown-item"
                  onClick={() =>
                    setAssignmentData({
                      ...assignmentData,
                      language: "nodejs",
                    })
                  }
                >
                  nodejs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 align-center">
        <Image className="w-100" src={assignmentModalVector} alt="" />
      </div>
    </div>
  );
}
