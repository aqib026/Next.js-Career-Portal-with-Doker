import React from "react";

export default function TablesTop({ path,setLimit }) {
  return (
    <div className="space-between align-center">
      <div className="listHeading">
        {path == "users" ? (
          <h4>Users List</h4>
        ) : path == "assignment" ? (
          <h4>Assignment List</h4>
        ) : path == "jobApplications" ? (
          <h4>Applications List</h4>
        ) : (
          <h4>Job List</h4>
        )}
      </div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle sort-dropdown"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Number of sort
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" onClick={() =>setLimit(10)}>
            10
          </a>
          <a className="dropdown-item" onClick={() =>setLimit(20)}>
            20
          </a>
          <a className="dropdown-item" onClick={() =>setLimit(50)}>
            50
          </a>
        </div>
      </div>
    </div>
  );
}
