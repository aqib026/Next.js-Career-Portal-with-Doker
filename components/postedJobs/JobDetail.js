import React from 'react'
import { useRouter } from 'next/router'
import Image from "next/future/image";

import { check,calendar, experience, code, contract } from '../../public/assets/images'

export default function JobDetail({item, index}) {

    const router = useRouter()
    
  return (
    <div className="col-lg-6 mt-5" key={index}>
                      <div className="box box-padding applicationBox">
                        <div className="d-flex align-center">
                          <Image

                            className="vq-job-icon mr-3"
                            src={code}
                            alt="Service Background Line"
                          />
                          <div className="vq-job">
                            <h2>{item.title}</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 mt-4">
                            <div className="vq-job">
                              <h6 className="text-left">Min Experience</h6>
                            </div>
                            <div className="d-flex align-center mt-3">
                              <Image
                                className="w-40px mr-3"
                                src={experience}
                                alt="Service Background Line"
                              />
                              <div className="vq-job">
                                <h3>{item.minExperience}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 mt-4">
                            <div className="vq-job">
                              <h6 className="text-left">Posted</h6>
                            </div>
                            <div className="d-flex align-center mt-3">
                              <Image
                                className="w-40px mr-3"
                                src={calendar}
                                alt="Service Background Line"
                              />
                              <div className="vq-job">
                                <h3>{item.datePosted}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 mt-4">
                            <div className="vq-job">
                              <h6 className="text-left">jobType</h6>
                            </div>
                            <div className="d-flex align-center mt-3">
                              <Image
                                className="w-40px mr-3"
                                src={contract}
                                alt="Service Background Line"
                              />
                              <div className="vq-job">
                                <h3>{item.jobType}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="vq-job mt-3 vq-job-height">
                          <p>{item.description}</p>
                        </div>
                        <div className="vq-job d-flex space-between mt-3 vq-mobile-flex">
                          <div className="myAppHeading">
                            <h6 className="text-left">{item.jobLocation}</h6>
                            <h4>
                              <span>V</span>Qode Solutions
                            </h4>
                          </div>
                          <a className="unset">
                            <button
                              type="button"

                              className="btn btn-primary create-btn startBtn vq-btn"
                              onClick={() =>
                                router.push(
                                  {
                                    pathname: "/applyJob",
                                    query: item,
                                  },
                                  "/applyJob"
                                )
                              }
                            >
                              View{" "}
                              <i className="fa-solid fa-chevron-right ml-2"></i>
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>  )
}
