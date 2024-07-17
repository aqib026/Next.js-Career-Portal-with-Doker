import React, { useState, useEffect } from "react";
import Image from "next/future/image";
import ReactPaginate from 'react-paginate';


import { useSelector } from "react-redux";
import TableData from "./TableData";
import { useGetAllUsersQuery } from "../../redux/users/Services";
import { useGetAllJobPostsQuery } from "../../redux/jobPosts/Services";
import { useGetAllAssessmentsQuery } from "../../redux/assesments/Services";
import gif from '../../public/assets/images/gif.gif'
import { useGetAllApplicationsQuery } from "../../redux/applications/applicationsAPI";

export default function TablesBody({ pathName, query, limit, searchAction, pagenum, setTottalPages }) {
 const [data, setData] = useState({
    limit: limit,
    pagenum: pagenum ? pagenum : 1
  })
  const user = useGetAllUsersQuery(data);
  const job = useGetAllJobPostsQuery(data);
  const assessment = useGetAllAssessmentsQuery(data);
  useGetAllApplicationsQuery(data);
console.log(JSON.stringify(data))
  const [users, setUsers] = useState(user);
  const [jobs, setJobs] = useState(job);
  const [assessments, setAssessments] = useState(assessment);
  const applications = useSelector((state) => state.applications.applications);

  useEffect(() => {
    setData({ ...data, pagenum: pagenum ? pagenum : 1, limit: limit })
  }, [pagenum, limit])
  useEffect(() => {
 setUsers(user);
    setJobs(job);
    setAssessments(assessment);
    if (pathName == "/users") {
      setTottalPages(users.data?.totalPages)

    }
    else if (pathName == "/jobApplications") {
      setTottalPages(applications?.totalPages)
    }
    else if (pathName == "/assignment") {
      setTottalPages(assessment.data?.totalPages)
    }
    else {
      setTottalPages(job.data?.totalPages)
    }
  }, [user, job, assessment]);

  if (users.isLoading ||
    job.isLoading ||
    assessment.isLoading)
    return (
      <tbody style={{
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: 'tranparent',
        justifyContent: 'center',
        display: 'flex',
        left: 0,
        right: 0,
        bottom: 0,
        top: 50
      }}>
        <tr><td>        <Image src={gif} alt="Find Job Banner" />
        </td></tr>
  </tbody>
    )
  else {
    return (
      <tbody>
        {pathName == "/users" ? (
          <>
            {users ? (
              <>
                {users.data?.users
                  .filter((user) => {
                    if (query === "") {
                      return user;
                    } else {
                      if (
                        user[searchAction]
                          .toLowerCase()
                          .includes(query.toLowerCase())
                      ) {
                        return job;
                      }
                    }
                  })

                  .map((item, index) => (
                    <TableData item={item} mykey={index} key={index} pathName={pathName} />
                  ))}
              </>
            ) : null}
          </>
        ) : pathName == "/jobApplications" ? (
          <>
            {applications && applications?.applications?.filter((application) => {
              if (query === "") {
                          return application;
                        } else {
                          if (searchAction == 'title') {
                            if (
                              application.jobPostId[0][searchAction].toLowerCase().includes(query.toLowerCase())
                            ) {
                              return application;
                            }
                }
                else {
                  if (
                    application.userId[0][searchAction].toLowerCase().includes(query.toLowerCase())
                  ) {
                    return application;
                  }
                }

              }
            })
              .map((item, index) => (
                <TableData item={item} mykey={index} key={index} pathName={pathName} />
    ))}
          </>
        ) : pathName == "/assignment" ? (
          <>
            {assessment.data?.assessments.filter((assignment) => {
              if (query === "") {
                return assignment;
              } else {
                if (
                  assignment[searchAction]
                    .toLowerCase()
                    .includes(query.toLowerCase())
                ) {
                  return assignment;
     }
              }
            })
              .map((item, index) => (
                <TableData item={item} mykey={index} key={index} pathName={pathName} />
   ))}
          </>
        ) : (
          <>
            {job ? <>
              {job.data?.jobPosts.filter((job) => {
                if (query === "") {
   } else {
                  if (
                    job[searchAction]
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  ) {
                    return job;
                  }
                }
              })
                .map((item, index) => (
                  <TableData item={item} mykey={index} key={index} pathName={pathName} />
    ))}
            </>
              :
              null}
          </>
        )}
      </tbody>
    );
  }
}
