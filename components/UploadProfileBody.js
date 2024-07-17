import React from 'react'
import { resumeIcon,edit,profileImage } from '../public/assets/images'
import Image from "next/future/image";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function UploadProfileBody({myProfileData,userData,resetPassword,newPassword, setNewPassword}) {


  const router = useRouter()
  const showMyImage = (file) => {
    window.open(`/uploads/${userData.data.resume}`, "Window Title", "width=500, height=450");
  }

  return (
    <div id="main">
    <div className="row">
      <div className="col-lg-12">
        <div className="box profileHeight">
          <div className="profile-bg"></div>
          <div className="box-padding profilePosition d-flex profileFlexend space-between w-100 unsetMobileFlex">
            <div className="d-flex profileFlexend unsetMobileFlex">
              <Image className="profileImage" src={myProfileData.profilePicture ? `/static/${myProfileData.profilePicture}` : profileImage}
                height={70}
                width={63} alt="Profile Picture" />
              <div className="profileName">
                <h2 >
                <div className="nowrap w170px">
                  {userData.data.first_name} {userData.data.Last_name}
               
               </div>
                </h2>
                <div className="nowrap w230px">
                <h3 className="elipsesText">{userData.data.headline}</h3>
               
               </div>
              </div>
            </div>
       
            <button type="button" className=" mr-4 changeProfileBtn" data-toggle="modal" data-target=".bd-example-modal-lg-picture">Change Profile</button>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="box">
          <div className="box-padding">
            <div className="d-flex space-between">
              <div className="heading">
                <h2>Profile Setting</h2>
                <h6>Your Profile Detail</h6>
              </div>
              <button
                type="button"
                className="create-btn m-0"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
              >
                <Image src={edit} alt="" />
              </button>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group mt-4">
                  <label htmlFor="exampleInputEmail1">
                    First Name
                  </label>
                  <div className="profileFieldBox elipsesText">
                    {userData.data.first_name}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mt-4">
                  <label htmlFor="exampleInputEmail1">
                    Last Name
                  </label>
                  <div className="profileFieldBox elipsesText">
                    {userData.data.Last_name}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <div className="profileFieldBox elipsesText">
                    {userData.data.email}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">Phone</label>
                  <div className="profileFieldBox elipsesText">
                    {userData.data.phone}
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">Headline</label>
                  <div className="profileFieldBox elipsesText">
                    {userData.data.headline}
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">Intro</label>
                  <div className="profileFieldBox profileIntro elipsesText">
                    {userData.data.bio}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        {userData.data.is_admin == false ?
          <div className="box resumeVector">
            <div className="box-padding">
              <div className="heading">
                <h2>Resume</h2>
                <h6>File format Pdf, doc</h6>
              </div>

              <div className="resumeBox">
                <div>
                  <label htmlFor="exampleInputEmail1">
                    Last Uploaded File
                  </label>
                </div>
                {userData.data.is_admin == false ?
                  <div className="d-flex mt-2 align-center space-between">
                    <div className="d-flex align-center">
                      <Image src={resumeIcon} alt="" />
                      <div className="profileName">
                        <h4 className="w80px nowrap">{userData.data.resume}</h4>
                      </div>
                    </div>
                          <i className="fa-solid fa-eye viewIcon" onClick={() => showMyImage()} ></i>
                  </div>


                  : null}
              </div>
              <button
                type="button"
                className="create-btn updateResume"
                onClick={() => router.push('/uploadResume')}
              >
                Update
              </button>
            </div>
          </div>
          :
          null}
        <div className="box mt-4">
          <div className="box-padding">
            <div className="heading">
              <h2>Password</h2>
              <h6>Change your password</h6>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail1">Old Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter old password"
                onChange={(e) => {
                  setNewPassword({
                    ...newPassword,
                    old_password: e.target.value
                  })
                }}
                value={newPassword.old_password ? newPassword.old_password:''}

              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="exampleInputEmail1">New Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter new password"
                onChange={(e) => {
                  setNewPassword({
                    ...newPassword,
                    new_password: e.target.value
                  })

                }}
                value={newPassword.new_password ? newPassword.new_password : ""}

              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="exampleInputEmail1">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter confirm password"
                onChange={(e) => {
                  setNewPassword({
                    ...newPassword,
                    confirm_password: e.target.value
                  })

                }}
                value={newPassword.confirm_password ? newPassword.confirm_password : ''}

              />
            </div>
            <button
              type="button"
              className="create-btn updateResume mt-4"
              onClick={() => resetPassword()}

            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>  )
}
