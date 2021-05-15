const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashPassword,
    });

    return res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      return res.status(201).json({
        status: "success",
      });
    }

    return res.status(403).json({
      status: "fail",
      message: "incorrect username or password",
    });
  } catch (err) {
    console.error(err);

    return res.status(400).json({
      status: "fail",
    });
  }
};
