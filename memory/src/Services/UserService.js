import { apiUrl } from "../config.json";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../Services/FormService";
import jwtDecode from "jwt-decode";
import auth from "./AuthService"
import httpService from "./httpService";

export const createUser = async (user) => {
  try {
    let { error } = validateRegisterUser(user);
    if (error) return error.message;
    const response = await httpService.Post(`${apiUrl}/users`, user);
    console.log("Response: ",response);
    const { data: jwt } = response;
    auth.setToken(jwt);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (user) => {
  try {
    let { error } = validateLoginUser(user);
    if (error) return error.message;
    const response = await httpService.Post(`${apiUrl}/auth`,user);
    const { data: jwt } = response;
    auth.setToken(jwt);
    return response;
  } catch (error) {
    return error;
  }
};

export const logoutUser = () => {
  auth.removeToken();
  window.location.replace("/");
};



export const getUser = () => {
  const jwt = auth.getToken();
  console.log(jwt);
  if (jwt) {
    const user = jwtDecode(jwt);
    return user;
  }
};
