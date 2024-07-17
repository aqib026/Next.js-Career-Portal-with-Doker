import React from 'react'
import Image from "next/future/image";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  calendar,
  code,
  computer,
  contract,
  experience,
  jobApply,
  salary,
  star,
} from "../../public/assets/images";

export default function JobDetails({ appliedJob }) {

  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="vq-job">
            <h1>Apply Job</h1>
            <h6>Plese click apply button</h6>
          </div>
          <a className="unset">
            <button
              type="button"
              className="btn btn-primary create-btn startBtn mt-4 w-100 webNone"
              onClick={() => router.push("/hello")}
            >
              Apply Now <i className="fa-solid fa-chevron-right ml-2"></i>
            </button>
          </a>
        </div>
        <div className="col-lg-8 mt-5">
          <div className="box box-padding applicationBox">
            <div className="d-flex align-center">
              <Image className="vq-job-icon mr-3" src={code} alt="" />
              <div className="vq-job">
                <h2>{router.query.title}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 mt-4">
                <div className="vq-job">
                  <h6 className="text-left">Min Experience</h6>
                </div>
                <div className="d-flex align-center mt-3">
                  <Image className="w-40px mr-3" src={experience} alt="" />
                  <div className="vq-job">
                    <h3>{router.query.minExperience}</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-4">
                <div className="vq-job">
                  <h6 className="text-left">Job Location</h6>
                </div>
                <div className="d-flex align-center mt-3">
                  <Image className="w-40px mr-3" src={computer} alt="" />
                  <div className="vq-job">
                    <h3>{router.query.jobLocation}</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-4">
                <div className="vq-job">
                  <h6 className="text-left">Job Type</h6>
                </div>
                <div className="d-flex align-center mt-3">
                  <Image className="w-40px mr-3" src={contract} alt="" />
                  <div className="vq-job">
                    <h3>{router.query.jobType}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="vq-job mt-4">
              <h6 className="text-left">Job Description</h6>
              <p className="pt-2">{router.query.description}</p>
            </div>
            <div className="vq-job mt-4">
              <h6 className="text-left">Responsibilities</h6>
            </div>
            {router.query.jobResponsibilities?.length > 0 ?

              <>
                {router.query.jobResponsibilities.map ? 
                
                <>{
                   router.query.jobResponsibilities.map((item, index) => {
                  return (
                    <div className="d-flex align-center mt-2" key={index}>
                      <Image className="vq-star mr-2" src={star} alt="" />
                      <div className="vq-job">
                        <p>{item}</p>
                      </div>
                    </div>
                  );
                })}
                </>
                :
                <div className="d-flex align-center mt-2" >
                <Image className="vq-star mr-2" src={star} alt="" />
                <div className="vq-job">
                  <p>{router.query.jobResponsibilities}</p>
                </div>
              </div>
             }
              </>

              :
              <p>no responsibilities listed</p>
            }


            <div className="vq-job mt-4">
              <h6 className="text-left">Skills</h6>
            </div>
            {router.query.jobSkills?.length > 0 ?
              
              <>
                {router.query.jobSkills.map ?
                <>{
                  router.query.jobSkills.map((item, index) => {
                    return (
                      <div className="d-flex align-center mt-2" key={index}>
                        <Image className="vq-star mr-2" src={star} alt="" />
                        <div className="vq-job">
                          <p>{item}</p>
                        </div>
                      </div>
                    );
                  })

                }</>
                :
                <div className="d-flex align-center mt-2" >
   <Image className="vq-star mr-2" src={star} alt="" />
                <div className="vq-job">
                  <p>{router.query.jobSkills}</p>
                </div>
              </div>
              }
              </>

              :
              <p>no skills listed</p>
            }


            <div className="row">
              <div className="col-lg-4 mt-4">
                <div className="vq-job">
                  <h6 className="text-left">Posted</h6>
                </div>
                <div className="d-flex align-center mt-3">
                  <Image className="w-40px mr-3" src={calendar} alt="" />
                  <div className="vq-job">
                    <h3>{router.query.datePosted}</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-4">
                <div className="vq-job">
                  <h6 className="text-left">Contract Length</h6>
                </div>
                <div className="d-flex align-center mt-3">
                  <Image className="w-40px mr-3" src={contract} alt="" />
                  <div className="vq-job">
                    <h3>{router.query.jobContractLength}</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-4">
                <div className="vq-job">
                  <h6 className="text-left">Salary Per Month</h6>
                </div>
                <div className="d-flex align-center mt-3">
                  <Image className="w-40px mr-3" src={salary} alt="" />
                  <div className="vq-job">
                    <h3>{router.query.salary}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-5">
          <div className="box box-color box-padding applicationBox">
            <div className="vq-apply">
              <h1>Apply Now</h1>
              <h6>For applying this job please click apply button</h6>
            </div>
            <Image className="w-100 mt-5" src={jobApply} alt="" />
            <a>
              <button
                type="button"
                className="btn btn-primary mt-5 vq-applynow-btn animated pulse"
                onClick={() => {
                  appliedJob(router.query);
                  router.push("/login");
                }}
              >
                <i className="fa-solid fa-check mr-2"></i> Apply Now
              </button>
            </a>
          </div>

        </div>
      </div>
    </div>)
}
