const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: { type: String, required: [true, "Password is required"] },
    fullname: { type: String, required: [true, "Fullname is required"] },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already in use"],
    },
    image: { type: String },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  1;
  if (!user) {
    throw new Error("User does not exist");
  }
  const hashMatchPass = await bcrypt.compare(password, user.password);
  if (!hashMatchPass) {
    throw new Error("Incorrect password");
  }
  return user;
};
userSchema.statics.signup = async function (
  email,
  password,
  fullname,
  username,
  image
) {
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    password: hashedPassword,
    fullname,
    username,
    image,
  });
  return user;
};

module.exports = mongoose.model("User", userSchema);
