const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Session, User } = require("../models");

const tokenExtractor = async (req, res) => {
  const authorization = req.get("authorization");
  // console.log("authorizzzz", authorization)
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const tokenClient = authorization.substring(7);
      // console.log("TOKEN CLIENT:", tokenClient)

      const tokenServer = await Session.findOne({
        where: { token: tokenClient },
      });

      // console.log("TOKEN SERVER: ", tokenServer)
      if (!tokenServer) {
        return res.status(401).json({ error: "token not found or expired" });
      }
      req.decodedToken = jwt.verify(tokenClient, SECRET);
      // console.log("TokenExtractor: ",req.decodedToken)
    } catch (error) {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
};

const checkUserDisabledToken = async (req, res, next) => {
  await tokenExtractor(req, res);
  // console.log("DECODED TOKEN: ", req.decodedToken)
  const user = await User.findByPk(req.decodedToken.id);
  // console.log("USER: " , user)
  if (user.disabled) {
    return res.status(401).json({ error: "User has been disabled" });
  }
  next();
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const errorHandling = async (err, req, res, next) => {
  res.status(400).send({ eror: err });
  next(err);
};

module.exports = { blogFinder, errorHandling, checkUserDisabledToken };
