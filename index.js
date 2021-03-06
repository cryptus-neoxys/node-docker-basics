const { json } = require("express");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const redis = require("redis");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const app = express();
app.use(cors());
app.enable("trust proxy");

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 1 * 60 * 1000,
    },
  })
);
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

app.get("/api/v1", async (req, res) => {
  console.log("Hey there!");
  return res.status(200).json({ messge: "Hey there!" });
});

app.use("/api/v1/posts", postRouter);

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`🚀 server listening on ${PORT}`);
  connectWithRetry();
});
