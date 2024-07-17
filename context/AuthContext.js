import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import {setAppliedJob} from "../redux/userReducer";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import {useDispatch} from "react-redux";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {

        setUser( user ? user : null );


      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    dispatch(setAppliedJob(""))
  };

  const forgotPassword = async (email) => {
    return sendPasswordResetEmail(auth, email)
  };
  return (
    <AuthContext.Provider value={{ user, login, signup, logout,forgotPassword }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
