router = require("express").Router();
const Session = require("../models/session");
const { checkUserDisabledToken } = require("../util/middleware");

router.delete("/", checkUserDisabledToken, async (request, response) => {
  const sessionToken = await Session.findOne(request.decodedToken.token);
  if (sessionToken) {
    await sessionToken.destroy();
    return response.status(200).end();
  } else {
    return response.status(400).json({ error: "token not found" });
  }
});

module.exports = router;
