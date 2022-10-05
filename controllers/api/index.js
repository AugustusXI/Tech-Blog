const router = require("express").Router();
const postRoutes = require("./postRoutes");

router.use("/post", postRoutes);

// exports the router module
module.exports = router;
