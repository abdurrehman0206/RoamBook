const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({
      success: false,
      message: "Authorization Required",
      error: "Authentication Failed",
    });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id, email } = JWT.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id, email });
    req.user = { ...user };
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Authentication Required",
      error: "Authentication Failed",
    });
  }
};

module.exports = requireAuth;
