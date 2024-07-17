import React from "react";
import { addUserVector } from "../../public/assets/images/index";
import Image from "next/future/image";

export default function UserModal({ status, setUserData, userData }) {
  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="addUser-heading">
          <h2>{status}</h2>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputEmail1" className="addUser-label">
            First Name
          </label>
          <input
            type="name"
            className="form-control addUser-input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter First Name"
            onChange={(e) =>
              setUserData({
                ...userData,
                first_name: e.target.value,
              })
            }
            value={userData.first_name}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputEmail1" className="addUser-label">
            Last Name
          </label>
          <input
            type="name"
            className="form-control addUser-input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Last Name"
            onChange={(e) =>
              setUserData({
                ...userData,
                Last_name: e.target.value,
              })
            }
            value={userData.Last_name}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputEmail1" className="addUser-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control addUser-input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              setUserData({
                ...userData,
                email: e.target.value,
              })
            }
            value={userData.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="addUser-label">
            Phone Number
          </label>
          <input
            type="email"
            className="form-control addUser-input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter phone"
            onChange={(e) =>
              setUserData({
                ...userData,
                phone: e.target.value,
              })
            }
            value={userData.phone}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="addUser-label">
            Password
          </label>
          <input
            type="password"
            className="form-control addUser-input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Password"
            onChange={(e) =>
              setUserData({
                ...userData,
                password: e.target.value,
              })
            }
            value={userData.password}
          />
        </div>
      </div>
      <div className="col-lg-6 align-center">
        <Image
          layout="raw"
          className="w-100 mobile-mt"
          src={addUserVector}
          alt=""
        />
      </div>
    </div>
  );
}
