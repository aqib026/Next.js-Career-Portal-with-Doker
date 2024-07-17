import React from "react";
import { useRouter } from "next/router";
import Image from "next/future/image";
import Link from "next/link";

import webLogo from "../../public/assets/images/webLogo.png";
import { useAuth } from "../../context/AuthContext";

export default function Header({ component }) {

  const router = useRouter();
    const { user } = useAuth();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {}
    };
    return (
    <div className="row">
      <div className="col-lg-12 flex align-center mb-4">
        <Image
          layout="raw"
          className="signIn-logo"
          src={webLogo}
          alt="Logo"
          onClick={() => router.push("/")}
        />
          {user ?
              <Link href="/login">
                  <button type="button" className="btn btn-primary signUp-btn" onClick={() => handleLogout()}>
                      <i className="fa-solid fa-user user-icon"></i> Sign out
                  </button>
              </Link>
              :
              <>
        {component == "login" || component == "forgot" ? (
          <Link href="/signup">
            <button type="button" className="btn btn-primary signUp-btn">
              <i className="fa-solid fa-user user-icon"></i> Sign Up
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button type="button" className="btn btn-primary signUp-btn">
              <i className="fa-solid fa-user user-icon"></i> Sign in
            </button>
          </Link>
        )}
              </>}
      </div>
    </div>
  );
}
