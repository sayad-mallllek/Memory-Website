import { apiUrl } from "../config.json";
import axios from "axios";
import {
  validateInputText,
  validateInputFile,
  validateComment,
} from "../Services/FormService";
import FormError from "../Errors/FormError";
import httpService from "./httpService";

// console.log(auth.getToken());

export const getPosts = async () => {
  const posts = await httpService.Get(`${apiUrl}/posts`);
  return posts;
};

export const getPost = async (id) => {
  const post = await httpService.Get(`${apiUrl}/posts/${id}`);
  return post;
};

export const sendPost = async (post) => {
  try {
    console.log(post);
    let { error } = validateInputText({
      title: post.get("title"),
      text: post.get("text"),
    });
    if (error) {
      return error.message;
    }

    let imageError = validateInputFile(post.get("img"));
    if (imageError) return imageError.message;
    const response = await httpService.PostMultiPart(`${apiUrl}/posts`, post);
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePost = async (post, id) => {
  try {
    let { error } = validateInputText({
      title: post.title,
      text: post.text,
    });
    if (error) {
      return error.message;
    }

    const response = await httpService.Put(`${apiUrl}/posts/${id}`, post);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await httpService.Delete(`${apiUrl}/posts/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const sendComment = async (comment, postId) => {
  try {
    let { error } = validateComment(comment);
    if (error) {
      return error.message;
    }
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
