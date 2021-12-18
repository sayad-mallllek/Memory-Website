// import { apiUrl } from "../config.json";
import axios from "axios";
import auth from "./AuthService";


axios.defaults.headers.common['x-auth-token'] = auth.getToken();

// const setHeaders = (jwt)

const Get = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const Post = async (url, data) => {
  const response = await axios({
    method: "post",
    url: url,
    data: data,
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

const PostMultiPart = async (url, data) => {
    const response = await axios({
      method: "post",
      url: url,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  };

const Put = async (url, data) => {
    console.log("Gonna update!")
  const response = await axios({
    method: "put",
    url: url,
    data: data,
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

const Delete = async(url) => {
  const response = await axios.delete(url);
  return response;
}
/* eslint-disable */
export default {
  Get,
  Post,
  PostMultiPart,
  Put,
  Delete
};
