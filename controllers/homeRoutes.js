const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const path = require("path");

// This is the 'get' route
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      raw: true,
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    console.log(postData);

    res.render("homepage", {
      postData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
