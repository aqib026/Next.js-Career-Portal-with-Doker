import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Image from "next/future/image";
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from "../../context/AuthContext";
import {
  serviceBackgroundLine,
  laptopSignup,
} from "../../public/assets/images";
import { useCreateUserMutation } from "../../redux/users/Services";

import { setUserData } from "../../redux/userReducer";
import Header from "../Layout/Header";
import { adduser } from "../../redux/userReducer";
import SignupConatiner from "../../components/signup/SignupConatiner";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { signup } = useAuth();
  const [createUser, responseInfo] = useCreateUserMutation();
  const [checkbox, setCheckBox] = useState(false)
  const [bordercolor, setbordercolour] = useState('rgba(81, 92, 111, 0.15)')
  let Mylist = []
  const [Emptyfields, setEmptyfields] = useState({
    email : true,
    password: true,
    first_name: true,
    Last_name: true,
    confirmPassword : true,
    phone: true
  })
  
  const [data, setData] = useState({
    first_name: "",
    Last_name: "",
    email: "",
    phone: "",
    password: "",
    resume: "",
    is_admin: false,
    created_at: "06/09/2031",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
handleSignup() 
   }
  }
  const handleSignup = async () => {
    if (
      data.first_name != "" &&
      data.phone != "" &&
      data.Last_name != "" &&
      data.email != "" &&
      data.password != "" &&
      confirmPassword != ""
    ) {
      if(checkbox != false)
      {
        if (data.password == confirmPassword) {
          try {
            await signup(data.email, data.password);
           toast.custom(
              <div style={{ marginTop: '3%',marginRight:'40%',width: '400px', height: '6vh',  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  
                  <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'green', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>account created succesfully</h3>
                  </div>
              </div>, { duration: 300 })    
            createUser(data).unwrap().then( async (res) => {
              const mydata = {id: res._id, data : res}
                      
              dispatch(setUserData(mydata));
              router.push("/uploadResume");
  
            })
          } catch (err) {
            
            if(err.code == 'auth/email-already-in-use')
            {
              toast.custom(
                <div style={{ marginTop: '3%',marginRight:'40%',width: '400px', height: '6vh',  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    
                    <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>email already in use</h3>
                    </div>
                </div>, { duration: 300 })  
            }
            if(err.code == 'auth/invalid-email')
            {
              toast.custom(
                <div style={{ marginTop: '3%',marginRight:'40%',width: '400px', height: '6vh',  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    
                    <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>invalid email</h3>
                    </div>
                </div>, { duration: 300 })  
            }
            if(err.code == 'auth/weak-password')
            {
              toast.custom(
                <div style={{ marginTop: '3%',marginRight:'40%',width: '400px', height: '6vh',  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    
                    <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>weak password</h3>
                    </div>
                </div>, { duration: 300 })  
            }
           
          }
  
        } else {
          toast.custom(
            <div style={{ marginTop: '3%',marginRight:'40%',width: '400px', height: '6vh',  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>password should be same</h3>
                </div>
            </div>, { duration: 300 })        }
      }
      else {
        toast.custom(
          <div style={{ marginTop: '3%',marginRight:'40%',width: '400px', height: '6vh',  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>kinldy fill check box</h3>
              </div>
          </div>, { duration: 300 })
      }
     
    } else {
      checkemptyfield()
      setbordercolour('red')
      toast.custom(
        <div style={{ marginTop: '3%',marginRight:'40%',width: '400px', height: '6vh',  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <div style={{ alignSelf: 'flex-start', width: '80%', height: '100%', borderLeftWidth: '8px', borderColor: 'red', borderStyle: 'solid', borderBottomWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 5, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#515C6F', fontFamily: 'GraphikMedium', fontWeight: '100', fontSize: '12px' }}>kinldy fill all the fields</h3>
            </div>
        </div>, { duration: 300 })    }
  };
  const checkemptyfield = () => {
      setEmptyfields({
        ...Emptyfields,
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        Last_name: data.Last_name,
        phone : data.phone,
        confirmPassword : confirmPassword
      })


  }

  return (
    <div id="signIn-background">
      <Toaster />

      <Image
        layout="raw"
        className="bg-line"
        src={serviceBackgroundLine}
        alt="Line"
      />
      <div className="container containter-height">
        <Header component={"signup"} />
        <div className="row row-height">
          <div className="col-lg-7 align-center">
            <div>
              <Image
                layout="raw"
                className="sign-in-laptop"
                src={laptopSignup}
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
       <SignupConatiner checkbox={checkbox} confirmPassword={confirmPassword} handleSignup={handleSignup} setCheckBox={setCheckBox} setConfirmPassword={setConfirmPassword} setData={setData} data={data} handleKeyDown={handleKeyDown} Emptyfields={Emptyfields}/>
        </div>
      </div>
    </div>
  );
};

export default Signup;
