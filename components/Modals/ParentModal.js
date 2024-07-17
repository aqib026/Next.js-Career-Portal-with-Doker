import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

import {
  setUserUpdatedData,
} from "../../redux/userReducer";
import { useAuth } from "../../context/AuthContext";
import UserModal from "./UserModal";
import AssignmentModal from "./AssignmentModal";
import JobPostModal from "./JobPostModal";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../redux/users/Services";
import useUpdateApplicationMutation from '../../redux/applications/applicationsAPI'
import {
  useCreateJobPostMutation,
  useUpdateJobPostMutation,
  useGetAllJobPostsQuery
} from "../../redux/jobPosts/Services";
import {
  useCreateAssessmentMutation,
  useGetAllAssessmentsQuery,
  useUpdateAssessmentMutation,
} from "../../redux/assesments/Services";

export default function DashboardModal({ assignments }) {
  const { signup, logout, login } = useAuth();
  const data = { limit: 10, page: 1 }
  const assessment = useGetAllAssessmentsQuery(data)
var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  const updatedData = useSelector((state) => state.user.updatedData);
  const logedinUserData = useSelector((state) => state.user.userData);
  const [createUser, saveInfo] = useCreateUserMutation();
  const [updateUser, updateInfo] = useUpdateUserMutation();
  const [createJobPost, saveJobPostInfo] = useCreateJobPostMutation();
  const [updateJobPostData, updateJobPostInfo] = useUpdateJobPostMutation();
  const [createAssessment, saveAssessmentInfo] = useCreateAssessmentMutation();
  const [updateAssessment, updateAssessmentInfo] =
    useUpdateAssessmentMutation();


  const router = useRouter();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    assessmentId: "",
    evaluations: "",
    datePosted: today,
    hiringStatus: "",
    minExperience: "",
    datePosted: "",
    jobType: "",
    jobLocation: "",
    jobResponsibilities: [],
    jobSkills: [],
    jobContractLength: "",
    salary: "",
    isHiddein: ""
  });
  const [userData, setUserData] = useState({
    first_name: "",
    Last_name: "",
    email: "",
    password: "",
    phone: "",
    is_admin: false,
    created_at: "06/09/2031",
  });
  const [testCaseStatus, setTestCaseStatus] = useState("Add");
  const [responsibilitiStatus, setResponsibilitiStatus] = useState("Add");
  const [skillStatus, setSkillStatus] = useState("Add");

  const [modalStatus, setModalStatus] = useState("Add");

  const [updatedIndex, setUpdatedIndex] = useState("");
  const [testCasesData, setTestCasesData] = useState({
    input: "",
    expectedOutput: "",
  });
  const [skillsData, setSkillsData] = useState("");
  const [responsibilitiesData, setResponsibilitisData] = useState("");
  const [assessmentData, setAssessmentData] = useState({
    title: "",
    description: "",
    test_cases: [],
    language: "",
    testRun: "",
    function: "",
    comments: "",
    timeDuration: ""
  });
  const [status, setStatus] = "";
  const [testCasesList, setTestCasesList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [responsibilitiesList, setResponsibilitisList] = useState([]);

  useEffect(() => {
    const pathName = router.pathname;
    if (updatedData != "") {
      if (pathName == "/assignment") {
        setTestCasesList(updatedData.test_cases);
        setAssessmentData({
          ...assessmentData,
          title: updatedData.title,
          description: updatedData.description,
          test_cases: updatedData.test_cases,
          language: updatedData.language,
          testRun: updatedData.testRun,
          function: updatedData.function,
          comments: updatedData.comments,
          timeDuration: updatedData.timeDuration
        });
      } else if (pathName == "/jobPosts") {
        setSkillsList(updatedData.jobSkills);
        setResponsibilitisList(updatedData.jobResponsibilities)
        setJobData({
          ...jobData,
          title: updatedData.title,
          description: updatedData.description,
          assessmentId: updatedData.assessmentId,
          datePosted: updatedData.datePosted,
          hiringStatus: updatedData.hiringStatus,
          isHiddein: updatedData.isHiddein,
          minExperience: updatedData.minExperience,
          datePosted: updatedData.datePosted,
          jobType: updatedData.jobType,
          jobLocation: updatedData.jobLocation,
          jobResponsibilities: updatedData.jobResponsibilities,
          jobSkills: updatedData.jobSkills,
          jobContractLength: updatedData.jobContractLength,
          salary: updatedData.salary,

        });
      }
      else {
        setUserData({
          ...userData,
          first_name: updatedData.first_name,
          Last_name: updatedData.Last_name,
          email: updatedData.email,
          password: updatedData.password,
          phone: updatedData.phone,
          is_admin: updatedData.is_admin,
          created_at: updatedData.created_at,
        })
      }
    } else {
      reset();
    }
  }, [updatedData]);
  const dispatch = useDispatch();
  const pathName = router.pathname;

  const saveJobPost = async () => {
    if (updatedData) {
      const val = { ...jobData, jobSkills: skillsList, jobResponsibilities: responsibilitiesList };
      const updateJobPost = { id: updatedData._id, data: val };
      updateJobPostData(updateJobPost);
    } else {
      try {
        if (jobData.assessmentId != "") {
          const val = { ...jobData, datePosted: today, jobSkills: skillsList, jobResponsibilities: responsibilitiesList };
          createJobPost(val).unwrap().then(async (res) => {
            if (res) {
            }
          }).catch(error => {
          });
        }
        else {
          toast.custom(
            <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>failed..kinldy select assesment</h3>
              </div>
            </div>, { duration: 200 })
        }


      } catch (err) {
      }
    }
    reset();
  };

  const saveAssignemnt = async () => {
    if (updatedData) {
      const updateAssesment = { id: updatedData._id, data: assessmentData };
      updateAssessment(updateAssesment);
    } else {
      try {
        createAssessment(assessmentData);

        //  await logout()
      } catch (err) {
      }
    }
    reset();
  };

  const saveUser = async () => {
    if (updatedData) {
      const updateUserData = { id: updatedData._id, data: userData };
      updateUser(updateUserData);
    } else {
      try {
        await signup(userData.email, userData.password);
        createUser(userData);
        await login(logedinUserData.email, logedinUserData.password);

      } catch (err) {
      }
    }
    reset();
  };

  const reset = useCallback(() => {
    setTestCasesList([]);
    setSkillsList([])
    setResponsibilitisList([])
    setTestCasesData([])
    setSkillsData([])
    setResponsibilitisData([])
    setJobData({
      ...jobData,
      title: "",
      description: "",
      assessmentId: "",
      hiringStatus: "",
      datePosted: '',
      isHiddein: "",
      minExperience: "",
      datePosted: "",
      jobType: "",
      jobLocation: "",
      jobResponsibilities: [],
      jobSkills: [],
      jobContractLength: "",
      salary: "",


    });
    setAssessmentData({
      ...assessmentData,
      title: "",
      description: "",
      test_cases: "",
      language: "",
      testRun: "",
      function: "",
      comments: "",
      timeDuration: ""

    });
    setUserData({
      ...userData,
      first_name: "",
      Last_name: "",
      password: "",
      email: "",
      phone: "",
    });
    dispatch(setUserUpdatedData(""));
  }, [dispatch, userData, assessmentData, jobData]);

  const addTestCase = () => {
    if (testCasesData.input && testCasesData.expectedOutput) {
      setTestCasesList((testCasesList) => [...testCasesList, testCasesData]);
      setTestCasesData({
        ...testCasesData,
        input: "",
        expectedOutput: "",
      });
      setAssessmentData({
        ...assessmentData,
        test_cases: testCasesList,
      });
    }

  };
  const addSkill = () => {
    if (skillsData != "") {
      setSkillsList((skillsList) => [...skillsList, skillsData]);
      setSkillsData("");
      setJobData({
        ...jobData,
        jobSkills: skillsList,
      });
    }

  };
  const addResponsibiliti = () => {
    if (responsibilitiesData != "") {
      setResponsibilitisList((responsibilitiesList) => [...responsibilitiesList, responsibilitiesData]);
      setResponsibilitisData("");
      setJobData({
        ...jobData,
        jobResponsibilities: responsibilitiesList,
      });
    }

  };
  const updateTestCase = (item, index) => {
    setTestCasesData({
      ...testCasesData,
      input: item.input,
      expectedOutput: item.expectedOutput,
    });
  };
  const updateSkill = (item, index) => {
    setSkillsData(item);
  };
  const updateResponsibiliti = (item, index) => {
    setResponsibilitisData(item);
  };
  const update = () => {
    let newArr = [...testCasesList];
    newArr[updatedIndex] = testCasesData;

    setTestCasesList(newArr);
    setTestCasesData({
      ...testCasesData,
      input: "",
      expectedOutput: "",
    });
    setAssessmentData({
      ...assessmentData,
      test_cases: testCasesList,
    });
    setTestCaseStatus("Add");
  };

  const UpdateResponsibiliti = () => {
    let newArr = [...responsibilitiesList];
    newArr[updatedIndex] = responsibilitiesData;

    setResponsibilitisList(newArr);
    setResponsibilitisData("");
    setJobData({
      ...jobData,
      jobResponsibilities: responsibilitiesList,
    });
    setResponsibilitiStatus("Add");
  };

  const UpdateSkill = () => {
    let newArr = [...skillsList];
    newArr[updatedIndex] = skillsData;

    setSkillsList(newArr);
    setSkillsData("");
    setJobData({
      ...jobData,
      jobSkills: skillsList,
    });
    setSkillStatus("Add");
  };



  useEffect(() => {
    setAssessmentData({
      ...assessmentData,
      test_cases: testCasesList,
    });
    setJobData({
      ...jobData,
      jobSkills: skillsList,
    });
    setJobData({
      ...jobData,
      jobResponsibilities: responsibilitiesList,
    });
  }, [testCasesList, skillsList, responsibilitiesList]);


  return (
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-content-padding">
          {pathName == "/users" ? (
            <UserModal
              setUserData={setUserData}
              userData={userData}
              status={status}
            />
          ) : pathName == "/assignment" ? (
            <AssignmentModal
              testCaseStatus={testCaseStatus}
              setTestCasesData={setTestCasesData}
              setUpdatedIndex={setUpdatedIndex}
              setTestCaseStatus={setTestCaseStatus}
              updateTestCase={updateTestCase}
              addTestCase={addTestCase}
              update={update}
              testCasesData={testCasesData}
              testCasesList={testCasesList}
              setAssignmentData={setAssessmentData}
              assignmentData={assessmentData}
            />
          ) : (
            <JobPostModal
              responsibilitiStatus={responsibilitiStatus}
              setResponsibilitisData={setResponsibilitisData}
              setResponsibilitiStatus={setResponsibilitiStatus}
              updateResponsibiliti={updateResponsibiliti}
              addResponsibiliti={addResponsibiliti}
              UpdateResponsibiliti={UpdateResponsibiliti}
              responsibilitiesData={responsibilitiesData}
              responsibilitiesList={responsibilitiesList}
              skillStatus={skillStatus}
              setSkillsData={setSkillsData}
              setUpdatedIndex={setUpdatedIndex}
              setSkillStatus={setSkillStatus}
              updateSkill={updateSkill}
              addSkill={addSkill}
              UpdateSkill={UpdateSkill}
              skillsData={skillsData}
              skillsList={skillsList}
              assignments={assessment.data}
              setJobData={setJobData}
              jobData={jobData}
            />
          )}
          <div className="col-lg-12 flex-end">
            <button
              type="button"
              className="btn btn-primary modal-addUser-btn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => pathName == "/users"
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
              onClick={() => reset()}
            >
              <i className="fa-solid fa-xmark mr-2"></i>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
