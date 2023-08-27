const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const generateToken = (_id, email) => {
  const token = JWT.sign({ _id, email }, process.env.SECRET, {
    expiresIn: "3d",
  });
  if (!token) {
    throw new Error("Token generation failed");
  }
  return token;
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Please enter your email",
      error: "Email is required",
    });
  }
  if (!password) {
    return res.status(400).send({
      success: false,
      message: "Please enter your password",
      error: "Password is required",
    });
  }
  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id, user.email);
    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      image: user.image,
      token,
    };
    return res.status(200).send({
      success: true,
      message: "Login successful",
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      error: "Internal Server Error",
    });
  }
};
const signupUser = async (req, res) => {
  const { email, password, fullname, username, image } = req.body;
  if (!email || !password || !fullname || !username) {
    return res.status(400).send({
      success: false,
      message: "Please fill in all the fields",
      error: "Empty Inputs",
    });
  }
  try {
    const user = await User.signup(email, password, fullname, username, image);
    const token = generateToken(user._id, user.email);
    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      image: user.image,
      token,
    };
    return res.status(200).send({
      success: true,
      message: "User created successfully",
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      error: "Internal Server Error",
    });
  }
};
const verifyToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please provide a valid token",
      error: "Invalid token",
    });
  }
  try {
    const { _id, email } = JWT.verify(token, process.env.SECRET);
    const user = await User.findById({ _id, email });

    const userPayload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      image: user.image,
      token,
    };
    return res.status(200).json({
      success: true,
      message: "Token verified successfully",
      user: userPayload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      error: "Internal server error",
    });
  }
};

module.exports = {
  loginUser,
  signupUser,
  verifyToken,
};
