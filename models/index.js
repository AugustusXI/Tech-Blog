const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
Post.hasMany(Comment, {
  foreignKey: "post_id",
});
User.hasMany(Post, {
  foreignKey: "user_id",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
});
Comment.belongsTo(Post, {
  foreignKey: "id",
});
module.exports = { User, Post, Comment };
