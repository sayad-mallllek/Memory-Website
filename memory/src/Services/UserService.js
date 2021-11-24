import { apiUrl } from "../config.json";
import axios from "axios";
import { validateRegisterUser } from "../Services/FormService";

export const createUser = async (user) => {
  try {
    let { error } = validateRegisterUser(user);
    if (error) return error;

    const response = await axios({
      method: "post",
      url: apiUrl + "/users",
      data: user,
      headers: { "Content-Type": "application/json" },
    });
    console.log("done!");
    return response;
  } catch (error) {
    return error;
  }
};
