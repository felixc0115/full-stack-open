const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

const mongoURL = config.MONGODB_URI;

mongoose
  .connect(mongoURL)
  .then(() => console.log("connected to db"))
  .catch((error) => console.log("error connecting to db"));

module.exports = app;
