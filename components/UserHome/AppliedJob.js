import React from 'react'
import { useRouter } from 'next/router'
import Image from "next/future/image";
import { createAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { application, myJob, calendar, clock, hiringSearch, testCases } from '../../public/assets/images'

export default function AppliedJob({ appliedJob }) {

    const router = useRouter();
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

    const solveAssessment = (id) => {
        const applicationId = id._id;
        const assessmentId = id.jobPostId[0].assessmentId[0];
        const addApplicationId = createAction('ADD_APPLICATION_ID');
        const addAssessmentId = createAction('ADD_ASSESSMENT_ID');
        dispatch(addApplicationId(applicationId));
        dispatch(addAssessmentId(assessmentId));
        router.push("/solveAssessment");
    }

    return (
        <div className="col-lg-8 mt-5">
        {appliedJob.data ?
            appliedJob.data.map((item) => (
                <div key={item._id} className="applicationBox box mb-4">
                    <div className="box-padding">
                        <div className="d-flex space-between align-center mobileUnflex">
                            <div className="d-flex align-center">
                                <Image className="myJobICon" src={myJob} alt="" />
                                <div className="heading">
                                    <h2>{item.jobPostId[0]?.title}</h2>
                                </div>
                            </div>
                            <div className="appliedBtn">
                                <i className="fa-solid fa-check"></i> Applied
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 appliedBorder mt-4">
                                <div className="d-flex align-center">
                                    <Image
                                        className="appliedIcon"
                                        src={calendar}
                                        alt=""
                                    />
                                    <div className="myAppHeading elipsesText">
                                        <h6>Applied on</h6>
                                        <h5>{item.appliedOn.slice(0, 10)}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 appliedBorder mt-4">
                                <div className="d-flex align-center">
                                    <Image className="appliedIcon" src={clock} alt="" />
                                    <div className="myAppHeading">
                                        <h6>Time duration</h6>
                                        <h5>45 mins</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-4">
                                <div className="d-flex align-center">
                                    <Image
                                        className="appliedIcon"
                                        src={hiringSearch}
                                        alt=""
                                    />
                                    <div className="myAppHeading">
                                        <h6>Hiring Status</h6>
                                        <h5>{item.jobPostId[0]?.hiringStatus}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="myAppHeading">
                            <p className="pt-3">{item.jobPostId[0]?.description}</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="resumeBox testStatus">
                                    <div className="myAppHeading">
                                        <h5>Test Cases Status</h5>
                                    </div>
                                    <div className="d-flex mt-2 align-center space-between">
                                        <div className="d-flex align-center">
                                            <Image
                                                className="testCases"
                                                src={testCases}
                                                alt=""
                                            />
                                        </div>
                                        <div className={`casesStatus ${checkStatue(item.evaluationStatus)}`}>{item.evaluationStatus}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="resumeBox testStatus">
                                    <div className="myAppHeading">
                                        <h5>Application Status</h5>
                                    </div>
                                    <div className="d-flex mt-2 align-center space-between">
                                        <div className="d-flex align-center">
                                            <Image
                                                className="testCases"
                                                src={application}
                                                alt=""
                                            />
                                        </div>
                                        <div className={`casesStatus ${checkStatue(item.applicationStatus)}`}>{item.applicationStatus}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-center space-between mt-4">
                            <div className="myAppHeading">
                                <h6>Islamabad</h6>
                                <h4>
                                    <span>V</span>Qode Solutions
                                </h4>
                            </div>
                            { item.evaluationStatus === "Pending" &&
                                <a className="unset">
                                    <button
                                        type="button"
                                        
                                        className="btn btn-primary create-btn startBtn"
                                        onClick={() => solveAssessment(item)}
                                    >
                                        Start{" "}
                                        <i className="fa-solid fa-chevron-right ml-2"></i>
                                    </button>
                                </a>
                            }
                        </div>
                    </div>
                </div>
            )) : (
                <div className="box applicationBox">
                    <p style={{ textAlign: 'center' }}>no Jobs found</p>
                </div>
                
            )}
        </div>
    )
}
