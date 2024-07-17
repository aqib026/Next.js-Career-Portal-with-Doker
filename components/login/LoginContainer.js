import React from 'react'
import Link from 'next/link'

export default function LoginContainer({handleKeyDown,setData,data,Emptyfields,handleLogin,setCheckBox}) {
  return (
    <div className="col-lg-5 align-center">
    <div className="sign-in-box">
      <h3>Sign In</h3>
      <h4>Your Account</h4>
      <div className="form-group mt-4">
        <label htmlFor="exampleInputEmail1">Email Address*</label>
        <input
          type="email"
          className={data.email == "" ? Emptyfields.email == true ? "form-control errorBorder" : "form-control" : "form-control"}
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
          value={data.email ? data.email : ''}
        />
      </div>
      <div className="form-group mt-4">
        <label htmlFor="exampleInputEmail1">Password*</label>
        <input
          type="password"
          className={data.password == "" ? Emptyfields.password == true ? "form-control errorBorder" : "form-control" : "form-control"}
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

          value={data.password ? data.password :''}
        />
      </div>
      <div className="flex mt-4">
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
            Remember
          </label>
        </div>
        <Link href="/forgot">
          <h6>Forgot Password</h6>
        </Link>
      </div>
      <button
        type="button"
        className="btn btn-primary signIn-btn"
        onClick={() => handleLogin()}

      >
        <i className="fa-solid fa-user user-icon"></i> Sign In
      </button>
    </div>
  </div>  )
}
