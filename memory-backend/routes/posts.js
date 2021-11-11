const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Post, validatePost, validateImage } = require("../models/post");
var multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../memory/public/Images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  console.log("Getting all posts...");
  const posts = await Post.find();
  res.send(posts);
});

router.get("/:id", async (req, res) => {
  console.log("Getting post of id: ", req.params.id);
  const post = await Post.find({ _id: req.params.id });
  res.send(post[0]);
});

router.post("/", upload.single("img"), async (req, res) => {
  // let { error } = validatePost(req.body);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }

  // let { imageError } = validateImage(req.file);
  // if (imageError) {
  //   return res.status(400).send(ImageError.details[0].message);
  // }

  console.log("Adding new post...");
  console.log(req.file);
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    img: "/Images/" + req.file.filename,
    comments: [],
  });

  post
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
});

router.put("/:id", async (req, res) => {
  console.log(`Updating post with id: "${req.params.id}"...`);
  console.log(req.body);
  let { error } = validatePost(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      text: req.body.text,
    },
    { new: true }
  );

  if (!post) {
    return res.status(404).send("Post with given ID does not exist!");
  }

  res.send(post);
});

router.delete("/:id", async (req, res) => {
  console.log(`Deleting post with id: "${req.params.id}"...`);
  const post = await Post.findByIdAndRemove(req.params.id);
  if (!post) {
    return res.status(404).send("Post with given ID does not exist!");
  }
  res.send(post);
});

module.exports = router;
