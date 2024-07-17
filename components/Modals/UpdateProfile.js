import React from 'react'

export default function UpdateProfile({handleSubmission,myProfileData, setMyProfileData}) {
  return (
    <div
    className="modal fade bd-example-modal-lg"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-content-padding">
          <div className="row">
            <div className="col-lg-12">
              <div className="addUser-heading">
                <h2>Edit Profile Setting</h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="addUser-label"
                >
                  First Name
                </label>
                <input
                  type="name"
                  className="form-control addUser-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                  onChange={(e) =>
                    setMyProfileData({
                      ...myProfileData,
                      first_name: e.target.value,
                    })
                  }
                  value={myProfileData.first_name}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="addUser-label"
                >
                  Last Name
                </label>
                <input
                  type="name"
                  className="form-control addUser-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                  onChange={(e) =>
                    setMyProfileData({
                      ...myProfileData,
                      Last_name: e.target.value,
                    })
                  }
                  value={myProfileData.Last_name} />
              </div>
            </div>
          
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="addUser-label"
                >
                  Phone
                </label>
                <input
                  type="name"
                  className="form-control addUser-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter phone"
                  onChange={(e) =>
                    setMyProfileData({
                      ...myProfileData,
                      phone: e.target.value,
                    })
                  }
                  value={myProfileData.phone}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="addUser-label"
                >
                  Headline
                </label>
                <input
                  type="name"
                  className="form-control addUser-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter headline"
                  onChange={(e) =>
                    setMyProfileData({
                      ...myProfileData,
                      headline: e.target.value,
                    })
                  }
                  value={myProfileData.headline}
                />
              </div>
            </div>
            <div className="col-lg-12 mb-0">
              <div className="form-group mb-4">
                <label
                  htmlFor="exampleInputEmail1"
                  className="addUser-label"
                >
                  Intro
                </label>
                <textarea
                  className="form-control job-textarea"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Write..."
                  onChange={(e) =>
                    setMyProfileData({
                      ...myProfileData,
                      bio: e.target.value,
                    })
                  }
                  value={myProfileData.bio}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-lg-12 flex-end">
            <button
              type="button"
              className="btn btn-primary modal-addUser-btn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => handleSubmission()}
            >
              <i className="fa-solid fa-check mr-2"></i>Save
            </button>
            <button
              type="button"
              className="btn btn-primary modal-cancel-btn ml-2"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark mr-2"></i>Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>  )
}
