import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const userData = useSelector((state) => state.user.userLoginToken);

  return <div>dash borad screen user data {userData}</div>;
}
