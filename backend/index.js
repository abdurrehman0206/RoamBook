const serverless = require("serverless-http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(express.json());
app.use(cors(corsConfig));

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
app.use(logger);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    throw new Error(err.message);
  });
module.exports = app;
module.exports.handler = serverless(app);
