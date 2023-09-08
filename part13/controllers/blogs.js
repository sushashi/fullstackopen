const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { blogFinder, checkUserDisabledToken } = require("../util/middleware");

router.get("/", async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search,
          },
        },
        {
          author: {
            [Op.substring]: req.query.search,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });

  console.log(blogs.map((b) => b.toJSON()));
  res.json(blogs);
});

router.post("/", checkUserDisabledToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    console.log({ ...req.body, userId: user.id });

    const blog = await Blog.create({ ...req.body, userId: user.id });
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error: error.errors.map((e) => e.message) });
  }
});

router.delete("/:id", checkUserDisabledToken, blogFinder, async (req, res) => {
  if (req.decodedToken.id === req.blog.userId) {
    await req.blog.destroy();
    res.status(200).end();
  } else {
    return res.status(401).json("User not allowed to delete");
  }
});

router.put("/:id", blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog).status(200).send;
});

module.exports = router;
