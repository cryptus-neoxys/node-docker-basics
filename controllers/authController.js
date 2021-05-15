const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  try {
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
