const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);

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
