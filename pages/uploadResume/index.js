import React, { useState, useEffect } from "react";
import Image from "next/future/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';

import { useAddBannerMutation } from "../../redux/uploadResume/Services";
import { useUpdateUserMutation } from "../../redux/users/Services";
import {
  resumeLaptop,
  serviceBackgroundLine,
  uploadResumeVector,
  webLogo,
} from "../../public/assets/images";
import Header from "../Layout/Header";
import { useAuth } from "../../context/AuthContext";
import { setUserData } from "../../redux/userReducer";

export default function UploadResume() {
  const [addBanner, { isBannerLoading }] = useAddBannerMutation();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState("");
  const [isSelectedFile, setIsSelectedFile] = useState("");
  const userData = useSelector((state) => state.user.userData);
  const [updateUser, updateInfo] = useUpdateUserMutation();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelectedFile(true);
  };
  const handleSubmission = async () => {
    if(setIsSelectedFile == true || selectedFile != "")
    {
      const formData = new FormData();
      formData.append('file', selectedFile);
      addBanner(formData).unwrap().then(async (res) => {
        if (res.success) {
          const v = { ...userData.data, resume: res.uploadedFileName };
          const val = { ...userData, data: v };
  
          const updateUserData = { id: userData.id, data: val };
          const updatedData = { id: userData.data._id, data: val.data };
  
          dispatch(setUserData(updatedData))
          await updateUser(updateUserData).unwrap().then(async (res) => {
            router.push('/UserHome')
          })
  
        }
      })
    }
    else {
      toast.custom(
        <div style={{ marginTop: '3%',marginRight:'40%',width: '400px', height: '6vh',  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>kinldy select a file</h3>
            </div>
        </div>, { duration: 300 }) 
    }
   
  };

  return (
    <div id="signIn-background">
            <Toaster />
      <Image className="bg-line" src={serviceBackgroundLine} alt="Line" />
      <div className="container containter-height">
        <Header component={"uploadResume"} />
        <div className="row row-height">
          <div className="col-lg-7 align-center">
            <div>
              <Image
                className="sign-in-laptop"
                src={resumeLaptop}
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
              <h3>Resume</h3>
              <h4>File format pdf, doc</h4>
              <div className="forgot-flex">
                <Image
                  className="authResumeVector"
                  src={uploadResumeVector}
                  alt=""
                />
              </div>
              <div className="mt-4">
                <label htmlFor="exampleInputEmail1">
                  Please upload your resume
                </label>
              </div>
              <div className="input-group mt-1">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    onChange={changeHandler}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    {isSelectedFile ? (
                      <>{selectedFile.name}</>
                    ) : (
                      "choose a file"
                    )}
                  </label>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary signIn-btn"
                onClick={handleSubmission}
              >
                <i className="fa-solid fa-check mr-2"></i> Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
