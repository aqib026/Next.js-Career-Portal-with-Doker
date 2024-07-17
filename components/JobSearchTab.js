import React from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function JobSearchTab({ path, searchAction, query, setQuery, setSearchAction }) {

  const action = 'Search by'

  return (
    <div className="row">
         <Toaster reverseOrder={false}
        gutter={8} />
      <div className="col-lg-8">
        <div className="box searchbox">
          <div className="box-padding">
            <div className="row">
              <div className="col-lg-12 mb-3">
                <label htmlFor="exampleInputEmail1">Action</label>
                <div className="dropdown">
                  {
                    searchAction != ""
                      ?
                      <button
                      className= "btn btn-secondary dropdown-toggle searchAction darkColor"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {
                          searchAction == "first_name" ? "Name" : searchAction.charAt(0).toUpperCase() + searchAction.slice(1)
                        }
                      </button>
                      :


                      <button
                      className="btn btn-secondary dropdown-toggle searchAction lightColor" 
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Search by
                      </button>
                  }
                  {path == "users" ? (
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        onClick={() => setSearchAction("first_name")}
                      >
                        Name
                      </a>

                      <a
                        className="dropdown-item"
                        onClick={() => setSearchAction("email")}
                      >
                        Email
                      </a>
                      <a
                        className="dropdown-item"
                        onClick={() => setSearchAction("phone")}
                      >
                        Phone
                      </a>
                    </div>
                  ) : path == "assignment" ? (
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        onClick={() => setSearchAction("title")}
                      >
                        Assignment Title
                      </a>
                      <a
                        className="dropdown-item"
                        onClick={() => setSearchAction("description")}
                      >
                        Description
                      </a>
                      <a
                        className="dropdown-item"
                        onClick={() => setSearchAction("language")}
                      >
                        Language
                      </a>
                    </div>
                  ) : (
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        onClick={() => setSearchAction("title")}
                      >
                        Job Title
                      </a>
                      <a
                        className="dropdown-item"
                        onClick={() => setSearchAction("description")}
                      >
                        description
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <label htmlFor="exampleInputEmail1">Search</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bgColor border0"
                      id="basic-addon1"
                    >
                      <i className="fa-solid fa-magnifying-glass searchIcon"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control inputBorder bgColor border0"
                    placeholder="Search..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => { searchAction != "" ? setQuery(e.target.value) :    toast.custom(
                      <div style={{  marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
                        <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: '#db914c', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>kinldy set search action</h3>
                        </div>
                      </div>, { duration: 300 })}}
                    value={query}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="flex-end">
                  <button type="button" className="searchBtn">
                    <i className="fa-solid fa-magnifying-glass mr-2"></i>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {path != "jobApplications" ? (
        <div className="col-lg-4">
          <div className="box boxHeight job-create">
            <div className="box-padding">
              <div className="heading">
                <h2>Create</h2>
                {path == "users" ? (
                  <h6>Create new user</h6>
                ) : path == "assignment" ? (
                  <h6>Create new assignemnt</h6>
                ) : (
                  <h6>Create new job</h6>
                )}
                
              </div>
              <button

                type="button"
                className="create-btn"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
              >
                <i className="fa-solid fa-plus fs-20"></i>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
