import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/future/image";
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from "../../context/AuthContext";
import { serviceBackgroundLine, laptop } from "../../public/assets/images";
import Header from "../Layout/Header";
import { useGetAllUsersQuery } from "../../redux/users/Services";
import { setUserData } from "../../redux/userReducer";
import LoginContainer from "../../components/login/LoginContainer";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { login } = useAuth();
  const users = useGetAllUsersQuery();

  useEffect(() => {
    return console.log()
  })
  const [bordercolor, setbordercolour] = useState('rgba(81, 92, 111, 0.15)')
  const [checkbox, setCheckBox] = useState(false)
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    is_admin: false,
  });
  const [Emptyfields, setEmptyfields] = useState({
    email: "",
    password: ""
  })

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin()
    }
  }
  const checkemptyfield = () => {
    if (data.email == "" && data.password == "") {
      setEmptyfields({
        ...Emptyfields,
        email: true,
        password: true
      })
    }
    else if (data.password == "") {
      setEmptyfields({
        ...Emptyfields,
        password: true,
      })
    }
    else if (data.email == "")
      setEmptyfields({
        ...Emptyfields,
        email: true
      })
  }
  const handleLogin = async () => {
    if (data.email != "" && data.password != "") {
      try {
        await login(data.email, data.password);
        for (let i = 0; i < users.data.length; i++) {
          if (users.data[i].email == data.email) {
              toast.custom(
                <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                  <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'green', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>login succesfully</h3>
                  </div>
                </div>, { duration: 200 })
              const mydata = { id: users.data[i]._id, data: users.data[i] }
              dispatch(setUserData(mydata));
              if (users.data[i].is_admin === true) {
                router.push("/users");
              } else {
                if (users.data[i].resume) {
                  router.push("/UserHome");
                }
                else {
                  router.push("/uploadResume");
                }
              
            }
          }
        }
      } catch (err) {
        if (err.code == "auth/user-not-found") {
          toast.custom(
            <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>User not found</h3>
              </div>
            </div>, { duration: 200 })
        }
        else if (err.code == "auth/network-request-failed") {
          toast.custom(
            <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>Kindly check you connection</h3>
              </div>
            </div>, { duration: 200 })
        }

        else if (err.code == "auth/invalid-email") {
          toast.custom(
            <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>kinldy type a valid email</h3>
              </div>
            </div>, { duration: 200 })
        }
        else if (err.code == "auth/wrong-password") {
          toast.custom(
            <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>kinldy check your password</h3>
              </div>
            </div>, { duration: 200 })
        }

      }



    }
    else {
      setbordercolour('red')
      checkemptyfield()
      toast.custom(
        <div style={{ marginTop: '3%', marginRight: '40%', width: '400px', height: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>Kindly fill all the fields</h3>
          </div>
        </div>, { duration: 200 })

    }

  };
  return (
    <div id="signIn-background"
    >
      <Toaster reverseOrder={false}
        gutter={8} />
      <Image
        layout="raw"
        className="bg-line"
        src={serviceBackgroundLine}
        alt="Line"
      />
      <div className="container containter-height">
        <Header component={"login"} />
        <div className="row row-height">
          <div className="col-lg-7 align-center">
            <div>
              <Image
                layout="raw"
                className="sign-in-laptop"
                src={laptop}
                alt="Laptop"
              />
              <h5>
                <span>V</span>Qode
              </h5>
              <p className="w85">
                Good quality software doesn’t happen by accident or by chance.
                It is always a result of consistent, passionate and intelligent
                effort.
              </p>
            </div>
          </div>
          <LoginContainer Emptyfields={Emptyfields} handleKeyDown={handleKeyDown} setData={setData} data={data} setCheckBox={setCheckBox} handleLogin={handleLogin} />

        </div>
      </div>
    </div>
  );
};

export default Login;
