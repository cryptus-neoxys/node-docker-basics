const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  return res.status(200).json({ messge: "Hey there!" });
});

app.listen(PORT, () => {
  mongoose
    .connect("mongodb://root:root@mongo/?authSource=admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
  console.log(`🚀 server listening on ${PORT}`);
});
