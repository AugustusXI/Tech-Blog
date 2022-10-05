const express = require("express");
const { Post } = require("../../models");
const router = express.Router();
const withAuth = require("../../utils/auth");
// get route for posts
router.get("/", async (req, res) => {
  try {
    console.log(req.session.user_id);
    const posts = await Post.findAll({});
    res.render("post", posts);
  } catch (err) {
    res.status(600).json(err);
  }
});
// send post to database
router.post("/", async (req, res) => {
  try {
    console.log(req.session.user_id);
    const newPost = await Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: 1,
    });
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).send({ message: `${err}` });
    console.log(err);
  }
});
module.exports = router;
