const router = require("express").Router();
const { ReadingList } = require("../models");
const { checkUserDisabledToken } = require("../util/middleware");

router.post("/", async (request, response) => {
  try {
    console.log(request.body);
    const readinglist = await ReadingList.create(request.body);
    response.json(readinglist);
  } catch (error) {
    return response.status(400).json(error);
  }
});

router.put("/:id", checkUserDisabledToken, async (request, response) => {
  const userid = request.decodedToken.id;
  const readinglist = await ReadingList.findByPk(request.params.id);

  if (userid === readinglist.userId) {
    readinglist.read = request.body.read;
    await readinglist.save();
    response.json(readinglist);
  } else {
    return response.status(400).json("user not allowed to change read status");
  }
});

module.exports = router;
