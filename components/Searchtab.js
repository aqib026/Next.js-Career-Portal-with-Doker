import React from "react";

export default function Searchtab({ path,searchAction, query,setSearchAction, setQuery }) {
  return (
    <div className="row">
      <div className="col-lg-12">
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
                        searchAction == 'first_name' ? 'name' : searchAction
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
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className="dropdown-item"
                      onClick={() => setSearchAction("first_name")}
                    >
                      User Name
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={() => setSearchAction("title")}
                    >
                      Job Title
                    </a>
                  </div>
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
                    onChange={(e) => setQuery(e.target.value)}
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
    </div>
  );
}
