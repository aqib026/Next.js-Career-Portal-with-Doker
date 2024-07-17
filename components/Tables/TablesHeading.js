import React from "react";

export default function TablesHeading({ path }) {
  return (
    <>
      {path == "users" ? (
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
            <th scope="col">is_admin</th>
          </tr>
        </thead>
      ) : path == "jobApplications" ? (
        <thead>
          <tr>
            <th scope="col" className="w100px">
              User Name
            </th>
            <th scope="col">Job Title</th>
            <th scope="col">Test Cases Status</th>
            <th scope="col">Application Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
      ) : path == "assignment" ? (
        <thead>
          <tr>
            <th scope="col" className="w100px">
              Title
            </th>
            <th scope="col">Description</th>
            <th scope="col">Test Cases</th>
            <th scope="col">Language</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
      ) : (
        <thead>
          <tr>
            <th scope="col">Job Title</th>
            <th scope="col">Description</th>
            <th scope="col">Evaluations</th>
            <th scope="col">Action</th>
            <th scope="col">Show/Hide</th>
          </tr>
        </thead>
      )}
    </>
  );
}
