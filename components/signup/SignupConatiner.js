import React from 'react'

export default function SignupConatiner({checkbox,confirmPassword,handleSignup,setCheckBox, setConfirmPassword,setData, data, handleKeyDown,Emptyfields}) {
  return (
    <div className="col-lg-5 align-center">
    <div className="sign-in-box">
      <h3>Sign Up</h3>
      <h4>Create Your Account</h4>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group mt-2">
            <label htmlFor="exampleInputEmail1">First Name*</label>
            <input
              type="text"
              className={data.first_name == "" ? Emptyfields.first_name == "" ? "form-control errorBorder" : "form-control" :"form-control" }
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter First Name"
              onChange={(e) =>
                setData({
                  ...data,
                  first_name: e.target.value,
                })
              }
              onKeyDown={handleKeyDown}

              value={data.first_name}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group mt-2">
            <label htmlFor="exampleInputEmail1">Last Name*</label>
            <input
              type="text"
              className={data.Last_name == "" ? Emptyfields.Last_name == "" ? "form-control errorBorder" : "form-control" :"form-control" }
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Last Name"
              onChange={(e) =>
                setData({
                  ...data,
                  Last_name: e.target.value,
                })
              }
              onKeyDown={handleKeyDown}

              value={data.Last_name}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email Address*</label>
        <input
          type="email"
          className={data.email == "" ? Emptyfields.email == "" ? "form-control errorBorder" : "form-control" :"form-control" }
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          onKeyDown={handleKeyDown}

          value={data.email}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Phone Number*</label>
        <input
          type="email"
          className={data.phone == "" ? Emptyfields.phone == "" ? "form-control errorBorder" : "form-control" :"form-control" }
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter phone number"
          onChange={(e) =>
            setData({
              ...data,
              phone: e.target.value,
            })
          }
          onKeyDown={handleKeyDown}

          value={data.phone}
        />
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group mt-1">
            <label htmlFor="exampleInputEmail1">Password*</label>
            <input
              type="password"
              className={data.password == "" ? Emptyfields.password == "" ? "form-control errorBorder" : "form-control" :"form-control" }
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Password"
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              onKeyDown={handleKeyDown}

              value={data.password}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group mt-1">
            <label htmlFor="exampleInputEmail1">
              Confirm Password*
            </label>
            <input
              type="password"
              className={confirmPassword == "" ? Emptyfields.confirmPassword == "" ? "form-control errorBorder" : "form-control" :"form-control" }
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}

              value={confirmPassword}
            />
          </div>
        </div>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input check-box"
          id="exampleCheck1"
          onKeyDown={handleKeyDown}
          onChange={(e) =>
            setCheckBox(!checkbox)
            } 
        />
        <label
          className="form-check-label remember-label"
          htmlFor="exampleCheck1"
        >
          I agree terms & conditions
        </label>
      </div>
      <button
        type="button"
        className="btn btn-primary signIn-btn"
        onClick={() => handleSignup()}
      >
        <i className="fa-solid fa-user user-icon"></i> Sign Up
      </button>
    </div>
  </div>  )
}
