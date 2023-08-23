const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  const Authorization = req.headers;
  if (!Authorization) {
    return res.status(401).send({
      success: false,
      message: "Authorization Required",
      error: "Authentication Failed",
    });
  }
  const token = Authorization.split(" ")[1];
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

modules.exports = requireAuth;
