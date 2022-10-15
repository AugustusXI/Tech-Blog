const router = require("express").Router();

const { User } = require("../../models");

// Create New User
router.post("/", (req, res) => {
  console.log("WE GOT THIS FAR");
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(401)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(401)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
    });
    res
      .status(202)
      .json({ user: dbUserData, message: "You are now logged in!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
