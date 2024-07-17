import React, { useState, useEffect } from "react";
import Image from "next/future/image";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, updatePassword } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';


import {
  webLogo,
} from "../../public/assets/images";
import { setUserData } from "../../redux/userReducer";
import { useUpdateUserMutation } from "../../redux/users/Services";
import { useAuth } from "../../context/AuthContext";
import SideBar from "../Layout/SideBar";
import { useAddBannerMutation, usePutFileMutation } from "../../redux/uploadResume/Services";
import UpdateProfile from "../../components/Modals/UpdateProfile";
import UploadProfile from "../../components/Modals/UploadProfile";
import UploadProfileBody from "../../components/UploadProfileBody";

export default function MyProfile() {
  const auth = getAuth();
  const { logout } = useAuth();
  const user = auth.currentUser;
  const dispatch = useDispatch()

  const [addBanner] = useAddBannerMutation();
  const [putFile] = usePutFileMutation();
  const [updateUser, updateInfo] = useUpdateUserMutation();
  const [selectedFile, setSelectedFile] = useState("");
  const [isSelectedFile, setIsSelectedFile] = useState("");
  const myProfile = useSelector((state) => state.user.myProfile);
  const userData = useSelector((state) => state.user.userData);

  const [newPassword, setNewPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [myProfileData, setMyProfileData] = useState({
    first_name: "",
    Last_name: "",
    email: "",
    is_admin: "",
    phone: "",
    bio: "",
    profilePicture: "",
    headline: "",
    resume: ""
  });

  useEffect(() => {
    setMyProfileData({
      ...myProfileData,
      first_name: userData.data.first_name,
      Last_name: userData.data.Last_name,
      email: userData.data.email,
      phone: userData.data.phone,
      bio: userData.data.bio,
      is_admin: userData.data.is_admin,
      profilePicture: userData.data.profilePicture,
      headline: userData.data.headline,
      resume:userData.data.resume
    })

  }, [])

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelectedFile(true);
  };
  const resetPassword = async () => {
    if (newPassword.old_password == "" || newPassword.new_password == "" || newPassword.confirm_password == "") {
      toast.custom(
        <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>kindly fill all the fields</h3>
          </div>
        </div>, { duration: 200 })     }
    else {
      if (newPassword.new_password == newPassword.confirm_password) {
        updatePassword(user, newPassword.new_password).then(async () => {
          const val = { ...userData, password: newPassword.new_password };
          const updateUserData = { id: userData.data._id, data: val };

          await updateUser(updateUserData).unwrap().then(async (res) => { })
          toast.custom(
            <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'green', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>update succesfully</h3>
              </div>
            </div>, { duration: 200 })
          setNewPassword({
            ...newPassword,
            new_password: "",
            old_password: "",
            confirm_password: ""
          })
        }).catch((error) => {
          toast.custom(
            <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>kindly login again to rest password</h3>
              </div>
            </div>, { duration: 200 })        })
      }
      else {
        toast.custom(
          <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>password should be same</h3>
            </div>
          </div>, { duration: 200 })      }

    }

  };
  const handleProfileUpload = async () => {
    const file = selectedFile
    const filename = encodeURIComponent(file.name)
    const fileType = encodeURIComponent(file.type)

    const res = await fetch(
      `/api/upload?file=${filename}&fileType=${fileType}`
    )
    const { url, fields } = await res.json()
    const formData = new FormData()

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const upload = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })
  };


  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) { }
  };

  const handleSubmission = async () => {

    const updateUserData = { id: userData.id, data: myProfileData };
    await updateUser(updateUserData).unwrap().then(async (res) => {
      dispatch(setUserData(updateUserData))

    })

  }

  return (
    <div id="dashboard-bg">
         <Toaster reverseOrder={false}
        gutter={8} />
      <div className="container-fluid">
        <div className="row">
          <SideBar handleLogout={handleLogout} type={userData.data.is_admin} />

          <div className="col-lg-12 p-0 mainPadding">
            <nav className="navbar navbar-expand-lg navbar-light white webNone space-between mobileFlex">
              <a className="navbar-brand">
                <Image className="mobileVQ" src={webLogo} alt="" />
              </a>
              <div>
                <i className="fa-solid fa-bell bell mt-6 mr-3"></i>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto mt-4">
                  <li className="nav-item">
                    <a className="nav-link" href="my-applications.html">
                      <i className="fa-solid fa-user topbar-icon"></i>My
                      Applications <span className="sr-only">(current)</span>
                    </a>
                  </li>
                </ul>
                <a href="sign-in.html">
                  <button type="button" className="btn btn-danger logoutMobile">
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                    Logout
                  </button>
                </a>
              </div>
            </nav>
            <div className="topbar mobile-none">
              <div className="row">
                <div className="col-lg-12 topbarFlex">
                  <i className="fa-solid fa-bell bell mt-6"></i>
                </div>
              </div>
            </div>
            <UploadProfileBody myProfileData={myProfileData} userData={userData} resetPassword={resetPassword} newPassword={newPassword} setNewPassword={setNewPassword} />
          </div>
        </div>
      </div>

      <UpdateProfile handleSubmission={handleSubmission} myProfileData={myProfileData} setMyProfileData={setMyProfileData} />

      <UploadProfile isSelectedFile={isSelectedFile} selectedFile={selectedFile} changeHandler={changeHandler} handleProfileUpload={handleProfileUpload} />
    </div>
  );
}
