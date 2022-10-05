const res = require("express/lib/response");

const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    res.redirect("/");
  }
};

module.exports = withAuth;
