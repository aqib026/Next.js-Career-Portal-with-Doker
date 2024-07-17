import React, { useState } from "react";
import Image from "next/future/image";
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from "../../context/AuthContext";
import {
  serviceBackgroundLine,
  laptopForgot,
  forgot,
} from "../../public/assets/images";
import Header from "../Layout/Header";

const Forgot = () => {
  const { forgotPassword } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(data.email);
      toast.custom(
        <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'green', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>Kindly check you email for password rest link</h3>
          </div>
        </div>, { duration: 200 })
    } catch (err) {}
  };

  return (
    <div id="signIn-background">
          <Toaster reverseOrder={false}
        gutter={8} />
      <Image
        layout="raw"
        className="bg-line"
        src={serviceBackgroundLine}
        alt="Line"
      />
      <div className="container containter-height">
        <Header component={"forgot"} />
        <div className="row row-height">
          <div className="col-lg-7 align-center">
            <div>
              <Image
                layout="raw"
                className="sign-in-laptop"
                src={laptopForgot}
                alt="Laptop"
              />
              <h5>
                <span>V</span>Qode
              </h5>
              <p className="w85">
                You can change your password for security reasons or reset it if
                you forget it. Your VQode Account password is used to access
                many Google products, like Gmail and YouTube.
              </p>
            </div>
          </div>
          <div className="col-lg-5 align-center">
            <div className="sign-in-box">
              <h3>Forgot Password</h3>
              <h4>Reset Your Account Password</h4>
              <div className="forgot-flex">
                <Image layout="raw" className="img" src={forgot} alt="Forgot" />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1">Email Address*</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                  value={data.email}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary signIn-btn"
                onClick={() => handleForgotPassword()}
              >
                <i className="fa-solid fa-check mr-2"></i> Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
