import Image from "next/future/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router'
import Editor from "@monaco-editor/react";
import { useRunJobeeRequestMutation } from "../../redux/jobee/Services";
import { useGetApplicationByIdQuery, useUpdateApplicationMutation } from "../../redux/applications/applicationsAPI";
import { useGetAssessmentByIdQuery } from "../../redux/assesments/Services";

import {
  addUserVector,
  calendar,
  clock,
  editor,
  hiringSearch,
  myJob,
  profileImage,
  webLogo,
} from "../../public/assets/images";
import SideBar from "../Layout/SideBar";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";

export default function SolveAssessment() {

  const router = useRouter();
  const userData = useSelector((state) => state.user.userData);
  const applicationId = useSelector((state) => state.applications.applicationId);
  const assessmentId = useSelector((state) => state.applications.assessmentId);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [finalValue, setFinalValue] = useState(defaultValue);
  const [runTest] = useRunJobeeRequestMutation();
  const { logout } = useAuth();
  const [application, setApplication] = useState();
  const [assessment, setAssessment] = useState();
  const [testCases, setTestCases] = useState();
  const [testResult, setTestResult] = useState([]);
  const [passTest, setPassTest] = useState(0);
  const applicationData = useGetApplicationByIdQuery(applicationId);
  const assessmentData = useGetAssessmentByIdQuery(assessmentId);
  const [updateApplication] = useUpdateApplicationMutation();

  useEffect(() => {
    if (applicationId === "" || assessmentId === "") {
      router.push("/UserHome");
    }
  }, []);
  
  useEffect(() => {
    setApplication(applicationData.data);
  }, [applicationData]);

  useEffect(() => {
    setAssessment(assessmentData.data);
    setTestCases(assessmentData.data?.test_cases);
    switch (assessmentData.data?.language) {
      case "php":
        setDefaultValue(`<?php \n\n// ${assessmentData.data.comments} \n\nfunction ${assessmentData.data.function}($a,$b) {\n\n}`);
        break;
      case "nodejs":
        setDefaultValue(`// ${assessmentData.data.comments} \n\nfunction ${assessmentData.data.function}($a,$b) {\n\n}`);
        break;
      default:
        break;
    }
  }, [assessmentData]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) { }
  };

  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    setIsEditorReady(true);
  }

  const handleChange = (val) => {
    setFinalValue(val);
  }

  const runTests = async () => {
    setTestResult([]);
    setPassTest(0);
    await testCases.map((item) => {
      const code = finalValue.replace('?>', '');
      let srcCode = "";
      switch (assessment.language) {
        case "php":
          srcCode = code + `\n\necho ${assessment.function}(${item.input});`
          break;
        case "nodejs":
          srcCode = code + `\n\n${assessment.function}(${item.input});`
          break;
        default:
          break;
      }
      const data = {
        run_spec: {
          language_id: assessment.language,
          sourcecode: srcCode
        }
      };
      runTest(data)
      .then((res) => {
        const testResultObj = {
          input: item?.input,
          output: res.data?.stdout,
          status: (res.data?.stdout === item.expectedOutput) ? true : false
        }
        setTestResult(current => [...current, testResultObj])
        setPassTest((res.data?.stdout === item.expectedOutput) ? current => current+1 : current => current+0)
      })
    });
  }

  const submit = async () => {
    setTestResult([]);
    setPassTest(0);
    await testCases.map((item) => {
      const code = finalValue.replace('?>', '');
      const srcCode = code + "\n\necho sumOfTwo(" + item.input + ");";
      const data = {
        run_spec: {
          language_id: assessment.language,
          sourcecode: srcCode
        }
      };
      runTest(data)
      .then((res) => {
        const testResultObj = {
          input: item.input,
          output: res.data?.stdout,
          status: (res.data?.stdout === item.expectedOutput) ? true : false
        }
        setTestResult(current => [...current, testResultObj])
        setPassTest((res.data?.stdout === item.expectedOutput) ? current => current+1 : current => current+0)
      })
    });
    const data = {
      id: applicationId,
      data: {
        evaluationStatus: passTest === testResult.length ? "Pass" : "Fail",
        evaluationResult: `${passTest} / ${testResult.length}`,
        evaluationCode: finalValue
      }
    }
    updateApplication(data)
    .unwrap()
    .then(() => {
      router.push("/UserHome");
    })
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
                    <a className="nav-link" href="my-applications.html">
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
                <div className="col-lg-12">
                  <div className="space-between align-center mobileUnflex">
                    <div className="heading mb-4">
                      <h5>Overview</h5>
                      <h4>Application Detail</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="box box-padding">
                    <div className="d-flex align-center space-between">
                      <div className="myAppHeading">
                        <h6>Applied on</h6>
                        <h5>{application?.appliedOn}</h5>
                      </div>
                      <Image
                        className="appliedIcon mr-0"
                        src={calendar}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="box box-padding">
                    <div className="d-flex align-center space-between">
                      <div className="myAppHeading">
                        <h6>Time duration</h6>
                        <h5>45 mins</h5>
                      </div>
                      <Image className="appliedIcon mr-0" src={clock} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="box box-padding">
                    <div className="d-flex align-center space-between">
                      <div className="myAppHeading">
                        <h6>Hiring Status</h6>
                        <h5>{application?.jobPostId[0].hiringStatus}</h5>
                      </div>
                      <Image
                        className="appliedIcon mr-0"
                        src={hiringSearch}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mt-4">
                  <div className="box">
                    <div className="box-padding">
                      <div className="d-flex space-between align-center mobileUnflex">
                        <div className="d-flex align-center">
                          <Image className="myJobICon" src={myJob} alt="" />
                          <div className="heading">
                            <h2>{assessment?.title}</h2>
                          </div>
                        </div>
                        <div className="appliedBtn">
                          <i className="fa-solid fa-check"></i> Applied
                        </div>
                      </div>
                      <div className="myAppHeading">
                        <p className="pt-3">{assessment?.description}</p>
                      </div>
                      <div className="w-100 mt-5">
                        <Editor
                          height="50vh"
                          theme="vs-dark"
                          defaultLanguage="php"
                          defaultValue={defaultValue}
                          onMount={handleEditorDidMount}
                          onChange={(val) => handleChange(val)}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary searchBtn mt-4"
                        onClick={runTests}
                      >
                        Run
                      </button>
                      <button onClick={submit} disabled={!isEditorReady} className="btn btn-primary searchBtn mt-4 ml-3">
                          Submit
                        </button>
                      <div className="row">
                        <div className="col-lg-5 mt-5">
                          <div className="heading">
                            <h2>Output</h2>
                          </div>
                          <div className="box-padding boxBorder h-25 scrollbar">
                            <div className="pt-3">
                              Output: 
                                <ul>
                                  {
                                    testResult && testResult.map((result, index) => (
                                      <li key={index}>{result.output}</li>
                                    ))
                                  }
                                </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7 mt-5">
                          <div className="heading">
                            <h2>Test: {passTest} Pass / {testResult.length - passTest} Fail</h2>
                          </div>
                          <div className="boxBorder box-padding">
                            {
                              testResult && testResult.map((result, index) => (
                                <div key={index} className="d-flex align-center">
                                  <i className={`fa-solid ${result.status ? "fa-check-circle checkIcon" : "fa-xmark-circle closeIcon"}`}></i>
                                  <div className="myAppHeading">
                                    <h5>Test Case {index}: Input {result.input}</h5>
                                  </div>
                                </div>
                              ))
                            }
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
    </div>
  );
}
