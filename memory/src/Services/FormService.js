import Joi from "joi-browser";
import FormError from "../Errors/FormError";

//Schemas

const postSchema = {
  title: Joi.string().required().min(1),
  text: Joi.string().required().min(1),
};

const commentSchema = {
  comment: Joi.string().required().min(1),
};

const userSchema = {
  username: Joi.string().min(4).max(23).required(),
  email: Joi.string().min(4).max(32).required().email(),
  password: Joi.string().min(5).max(255).required()
};

//Validations

export const validateInputText = (post) => {
  console.log(post);
  return Joi.validate(post, postSchema);
};

export const validateInputFile = (imageFile) => {
  if (!imageFile) {
    return new FormError("File input must not be empty!");
  }
  if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
    return new FormError(
      "Invalid image type! Please select a valid image type! (jpg|jpeg|png)"
    );
  }
};


export const validateComment = (comment) => {
  return Joi.validate(comment, commentSchema);
};


export const validateRegisterUser = (user) => {
    return Joi.validate(user, userSchema);
}


//Handlers

export const handleChange = (event, formValue, setFormValue) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
export const handleFileChange = (event, formValue, setFormValue) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.files[0],
    });
  };
