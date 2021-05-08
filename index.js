const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();

const PORT = process.env.PORT || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

app.get("/", async (req, res) => {
  return res.status(200).json({ messge: "Hey there!" });
});

app.listen(PORT, () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
  console.log(`🚀 server listening on ${PORT}`);
});
