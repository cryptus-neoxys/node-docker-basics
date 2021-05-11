const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => {
      console.error(err);
      setTimeout(connectWithRetry, 5000);
    });
};

app.get("/", async (req, res) => {
  return res.status(200).json({ messge: "Hey there!" });
});

app.use("/api/v1/posts", postRouter);

app.listen(PORT, () => {
  console.log(`🚀 server listening on ${PORT}`);
  connectWithRetry();
});
