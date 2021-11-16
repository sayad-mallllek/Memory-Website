const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Post, validatePost, validateImage } = require("../models/post");
const { uploadImage } = require("../models/multer");

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

router.post("/:id/comments", async (req, res) => {
  const comment = req.body.comment;
  const id = req.params.id;
  console.log("Posting comment to post of id: ", id);
  console.log("The comment:", comment);
  const result = await Post.findByIdAndUpdate(
    id,
    {
      $push: { comments: comment },
    },
    { new: true }
  );
  console.log(result.comments);
});

router.post("/", uploadImage, async (req, res) => {

  let { error } = validatePost({ title: req.body.title, text: req.body.text });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }


  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    img: "/Images/" + req.file.filename,
    comments: [],
  });


  uploadImage(req, res, (err) => {
    if (err || !req.file) {
      console.log("Converting imageError");
      return res.status(400).send("Invalid Image submission!");
    }
  });

  console.log("Adding new post...");

  post
    .save()
    .then((data) => {
      res.status(200).send("Success");
      console.log("About to add");
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
  res.status(200).send(post);
});

module.exports = router;
