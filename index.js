const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  return res.status(200).json({ messge: "Hey there" });
});

app.listen(PORT, () => console.log(`🚀 server listening on ${PORT}`));
