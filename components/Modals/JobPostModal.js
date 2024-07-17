import React from "react";
import { createJobVector } from "../../public/assets/images/index";
import Image from "next/future/image";

export default function JobPostModal({ skillStatus,
  setSkillsData,
  setUpdatedIndex,
  setSkillStatus,
  updateSkill,
  addSkill,
  UpdateSkill,
  skillsData,
  skillsList,
  assignments,
  setJobData,
  jobData,
  responsibilitiStatus,
  setResponsibilitisData,
  setResponsibilitiStatus,
  updateResponsibiliti,
  addResponsibiliti,
  UpdateResponsibiliti,
  responsibilitiesData,
  responsibilitiesList


}) {





  return (
    <div className="row">
      <div className="col-lg-7">
        <div className="addUser-heading">
          <h2>Create new job</h2>
        </div>
        <div className="assignmentScroll scrollbar" id="style-1">

        <div className="row">
          <div className="col-lg-8">
            <div className="form-group mb-4">
              <label htmlFor="exampleInputEmail1" className="addUser-label">
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
              <label htmlFor="exampleInputEmail1" className="addUser-label">
                Label
              </label>
              <div className="labelBox">
                <div className="labelColor"></div>
              </div>
            </div>
          </div>
        </div>
          <div className="row">
          <div className="col-lg-6">
            <div className="form-group mb-6">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
              Hiring Status
            </label>
            <input
                type="name"
                className="form-control addUser-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Hiring status"
                onChange={(e) =>
                    setJobData({
                      ...jobData,
                      hiringStatus: e.target.value,
                    })
                }
                value={jobData.hiringStatus ? jobData.hiringStatus : ''}
            />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-6">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
              Job location
            </label>
            <input
                type="name"
                className="form-control addUser-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Job Location"
                onChange={(e) =>
                    setJobData({
                      ...jobData,
                      jobLocation: e.target.value,
                    })
                }
                value={jobData.jobLocation ? jobData.jobLocation : ''}
            />
            </div>
          </div>
          </div>

          <div className="row">
          <div className="col-lg-6">
            <div className="form-group mb-6">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
            Job Type
            </label>
            <input
                type="name"
                className="form-control addUser-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Job type"
                onChange={(e) =>
                    setJobData({
                      ...jobData,
                      jobType: e.target.value,
                    })
                }
                value={jobData.jobType ? jobData.jobType : ''}
            />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-6">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
            Min Experience
            </label>
            <input
                type="name"
                className="form-control addUser-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Min experience"
                onChange={(e) =>
                    setJobData({
                      ...jobData,
                      minExperience: e.target.value,
                    })
                }
                value={jobData.minExperience ? jobData.minExperience : ''}
            />
            </div>
          </div>
          </div>

          <div className="row">
          <div className="col-lg-6">
            <div className="form-group mb-6">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
            Job Contract Length
            </label>
            <input
                type="name"
                className="form-control addUser-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Contract Length"
                onChange={(e) =>
                    setJobData({
                      ...jobData,
                      jobContractLength: e.target.value,
                    })
                }
                value={jobData.jobContractLength ? jobData.jobContractLength : ''}
            />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-6">
            <label htmlFor="exampleInputEmail1" className="addUser-label">
            Salary
            </label>
            <input
                type="name"
                className="form-control addUser-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter salary"
                onChange={(e) =>
                    setJobData({
                      ...jobData,
                      salary: e.target.value,
                    })
                }
                value={jobData.salary ? jobData.salary : ''}
            />
            </div>
          </div>
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
              setJobData({
                ...jobData,
                description: e.target.value,
              })
            }
            value={jobData.description ? jobData.description : ''}
          ></textarea>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputEmail1" className="addUser-label">
            Evaluations
          </label>
          <div className="dropdown evaluationsHold">
            {jobData.evaluations == "" ? 
            <button
              className="btn btn-secondary dropdown-toggle evaluations-dropdown lightColor"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Select Evaluations
            </button>
            :
            <button
            className="btn btn-secondary dropdown-toggle evaluations-dropdown darkColor"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {jobData.evaluations}
          </button>}
            <div className="dropdown-menu assignmentScroll scrollbar" id="style-1" aria-labelledby="dropdownMenuButton">
              {assignments ? (
                <>
                  {assignments.data?.assessments.filter((item) => {
               if(item.isHiddein != true)
               {
                return item
               }
               else {
                return null
               }

              })
              .map((item) => {
                    return (
                      <a
                        key={item.title}
                        className="dropdown-item"
                        onClick={() =>
                         { setJobData({
                            ...jobData,
                            assessmentId: item._id,
                            evaluations: item.title
                          });
                      
                        }
                        }
                      >
                        {item.title}
                      </a>
                    );
                  })}
               
            
                
                </>
              ) : (
                <a
                className="dropdown-item"
           
              >
              no assesments found
              </a>
              )}
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-6">
              <label
                htmlFor="exampleInputEmail1"
                className="addUser-label bold"
              >
                Add Skills
              </label>
            </div>
            <div className="col-lg-6 casesFlex">
              <button
                type="button"
                className="addSkills-btn"
                onClick={() =>
                  skillStatus == "Add" ? addSkill() : UpdateSkill()
                }
              >
                {skillStatus}
              </button>{" "}
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
              
                <input
                  type="name"
                  className="form-control addUser-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter skill"
                  onChange={(e) =>
                    setSkillsData( e.target.value)
                  }
                  value={skillsData ? skillsData : ''}
                />{" "}
              </div>
            </div>
          
            <div className="col-lg-12 mb-4">
              <div className="box modalList">
                {skillsList ? (
                  <>
                    {skillsList.length > 0 ? (
                      <table className="table table-striped mt-4 table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">Skill</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {skillsList.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item}</td>
                                <td>
                                  <i
                                    className="fa-solid fa-pen-to-square editColor"
                                    onClick={() => {
                                      setUpdatedIndex(index);
                                      updateSkill(item, index);
                                      setSkillStatus("Update");
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

        

          <div className="row">
            <div className="col-lg-6">
              <label
                htmlFor="exampleInputEmail1"
                className="addUser-label bold"
              >
                Responsibilities
              </label>
            </div>
            <div className="col-lg-6 casesFlex">
              <button
                type="button"
                className="addSkills-btn"
                onClick={() =>
                  responsibilitiStatus == "Add" ? addResponsibiliti() : UpdateResponsibiliti()
                }
              >
                {responsibilitiStatus}
              </button>{" "}
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
              
                <input
                  type="name"
                  className="form-control addUser-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter responsibility"
                  onChange={(e) =>
                    setResponsibilitisData(e.target.value)
                  }
                  value={responsibilitiesData ? responsibilitiesData : ''}
                />{" "}
              </div>
            </div>
          
            <div className="col-lg-12 mb-4">
              <div className="box modalList">
                {responsibilitiesList ? (
                  <>
                    {responsibilitiesList.length > 0 ? (
                      <table className="table table-striped mt-4 table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">Responsibility</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {responsibilitiesList.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item}</td>
                                <td>
                                  <i
                                    className="fa-solid fa-pen-to-square editColor"
                                    onClick={() => {
                                      setUpdatedIndex(index);
                                      updateResponsibiliti(item, index);
                                      setResponsibilitiStatus("Update");
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
        </div>



      





      </div>
      <div className="col-lg-5 align-center">
        <Image className="w-100" src={createJobVector} alt="" />
      </div>
    </div>
  );
}
