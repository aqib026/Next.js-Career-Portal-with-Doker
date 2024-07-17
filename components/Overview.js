import React from "react";
import { useRouter } from "next/router";

export default function Overview({ path }) {

  const router = useRouter()

  return (
    <div className="space-between align-center mobileUnflex">
      <div className="heading mb-4">
        <h5>Overview</h5>
        {path == "assignment" ? (
          <h4>Assignments</h4>
        ) : path == "users" ? (
          <h4>All Users</h4>
        ) : path == "jobApplications" ? (
          <h4>Job Applications</h4>
        ) : (
          <h4>Job Post</h4>
        )}
      </div>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a className="hrefColor" onClick={()=> router.push('/users')}>
                Dashboard
              </a>
            </li>
            <li className="breadcrumb-item" >
              {router.pathname.replace('/','')}
            </li>
          </ol>
        </nav>
     
    </div>
  );
}
