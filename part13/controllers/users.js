const router = require("express").Router();
const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error.errors.map((er) => er.message) });
  }
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  console.log(user.toJSON());
  user.username = req.body.username;
  await user.save();
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const where = {};
  if (req.query.read) {
    if (req.query.read === "true" || req.query.read === "false") {
      where.read = req.query.read === "true";
    } else {
      return res.status(400).json("Error in read query, must be true or false");
    }
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
        through: {
          attributes: ["id", "read"],
          where,
        },
      },
    ],
  });
  res.json(user);
});

module.exports = router;
