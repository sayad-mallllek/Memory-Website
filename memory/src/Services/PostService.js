import { apiUrl } from "../config.json";
import axios from "axios";
import { validateInputText, validateInputFile } from "../Services/FormService";
import FormError from "../Errors/FormError";

export const getPosts = async () => {
  const { data: posts } = await axios.get(`${apiUrl}/posts`);
  return posts;
};

export const getPost = async (id) => {
  const { data: post } = await axios.get(`${apiUrl}/posts/${id}`);
  // console.log("Got data from ",id," of post: ",post);
  return post;
};

export const sendPost = async (post) => {
  try {
    console.log(post);
    let { error } = validateInputText({ title: post.get("title"), text: post.get("text") });
    if (error) {
      return error;
    }
    
    let imageError = validateInputFile(post.get("img"));
    if (imageError) return imageError;
    const response = await axios({
      method: "post",
      url: apiUrl + "/posts",
      data: post,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePost = async (post, id) => {
  try {
    console.log("To be updated: ", post);
    const response = await axios({
      method: "put",
      url: apiUrl + "/posts/" + id,
      data: post,
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePost = async (id) => {
  console.log("To be deleted: ", id);
  try {
    const response = await axios.delete(`${apiUrl}/posts/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const sendComment = async (comment, postId) => {
  try {
    const response = await axios({
      method: "post",
      url: apiUrl + "/posts/" + postId + "/comments",
      data: comment,
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    return error;
  }
};
