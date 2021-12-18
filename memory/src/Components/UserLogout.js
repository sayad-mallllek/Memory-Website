import React, { useEffect } from "react";
import { logoutUser } from "../Services/UserService";

const UserLogout = () => {
  useEffect(() => {
   logoutUser();
  });
  return null;
};

export default UserLogout;
