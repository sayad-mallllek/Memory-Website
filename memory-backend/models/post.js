const mongoose = require("mongoose");
const Joi = require("joi");

const validatePost = (post) => {
  const schema = Joi.object().keys({
    title: Joi.string().required().min(1),
    text: Joi.string().required().min(1),
  });

  return schema.validate(post);
};

const validateImage = (image) => {
  const schema = Joi.object({
    filename: Joi.string().required(),
    path: Joi.string().required(),
    headers: Joi.object({
      "content-disposition": Joi.string().required(),
      "content-type": Joi.string().valid(["image/jpeg"]).required(),
    }).required(),
    bytes: Joi.number().required(),
  });

  return schema.validate(image);
};

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: String,
      },
    ],
  })
);

exports.Post = Post;
exports.validatePost = validatePost;
exports.validateImage = validateImage;
