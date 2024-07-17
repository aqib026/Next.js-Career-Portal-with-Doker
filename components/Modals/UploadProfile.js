import React from 'react'
import Image from "next/future/image";

import { uploadProfilePicture,uploadPicture } from '../../public/assets/images'

export default function UploadProfile({isSelectedFile, selectedFile, changeHandler, handleProfileUpload}) {
  return (
    <div className="modal fade bd-example-modal-lg-picture" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-content-padding">
          <div className="row">
            <div className="col-lg-6">
              <div className="addUser-heading">
                <h2>Update profile picture</h2>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="exampleInputEmail1" className="addUser-label pl-0">Click to your file.</label>
              </div>

              <div className="input-group mt-1">
              {isSelectedFile ? 
              (
                <p className="col-lg-6 align-center">{selectedFile.name}</p>   )
                :

              <div className="profileBrowse">
                <input type="file" className="custom-file-input" id="inputGroupFile01" 
                 onChange={changeHandler}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01"><Image className="upload-profile-icon"  src={uploadPicture} alt="Upload Picture"/> Upload file...</label>
              </div>
}

              </div>
            </div>
            <div className="col-lg-6 align-center">
              <Image className="w-100 mobile-mt" src={uploadProfilePicture} alt="Upload Profile Picture"/>
            </div>
          </div>
          <div className="col-lg-12 flex-end">
            <button type="button" className="btn btn-primary  modal-addUser-btn" data-dismiss="modal"  onClick={handleProfileUpload}><i className="fa-solid fa-check mr-2"></i>Update</button>
            <button type="button" className="btn btn-primary modal-cancel-btn ml-2" data-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark mr-2"></i>Cancel</button>
          </div>
        </div>

      </div>
    </div>
  </div>  )
}
