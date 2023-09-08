const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readinglist");
const Session = require("./session");

Blog.belongsTo(User);
User.hasMany(Blog);

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "users_marked" });

// User.belongsToMany(Blog, {through: ReadingList})
// Blog.belongsToMany(User, {through: ReadingList})

// Blog.sync({ alter: true })
// User.sync({ alter: true })

// User.sync()
// Blog.sync()

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
