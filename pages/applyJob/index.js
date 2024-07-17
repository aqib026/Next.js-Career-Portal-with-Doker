import React from "react";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import {
  applyJob,
  calendar,
  code,
  computer,
  contract,
  experience,
  jobApply,
  salary,
  serviceBackgroundLine,
  star,
} from "../../public/assets/images";
import JobDetails from "../../components/applyjob/JobDetails";

export default function ApplyJob() {
  
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector((state) => state.user.userData);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  const appliedJob = async (d) => {
    const data = {
      jobPostId: d,
      evaluationStatus: "Pending",

      evaluationResult: "0/0",
      applicationStatus: "Pending",
      appliedOn: today,
    }
    const addApplication = createAction('ADD_APPLICATION');
    dispatch(addApplication(data));
    router.push("/login");
  }

  return (
    <div>
      <div className="vq-find-job-BG">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 vq-search-vector">
              <Image src={applyJob} alt="" />
              <div className="vq-job mt-3">
                <p>
                  We Code for you… whatever your needs are, from a simple
                  website, to a sophisticated software solution. We are here to
                  fulfill your requirements in the most professional way. We are
                  committed to help our customers achieve their goals by
                  automating their processes.
                </p>
              </div>
              <a className="unset">
                <button
                  type="button"
                  className="btn btn-primary create-btn startBtn vq-btn mt-4"
                  onClick={() =>  router.push('/')}
                >
                  <i className="fa-solid fa-angle-left mr-2"></i> Find Job
                </button>
              </a>
            </div>
            <div className="col-lg-6 vq-search-vector">
              <Image className="w-100" src={jobApply} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Image className="vq-job-line" src={serviceBackgroundLine} alt="" />
      <JobDetails appliedJob={(data) => appliedJob(data)}/>
    </div>
  );
}
