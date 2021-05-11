const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  id = req.params.id;
  try {
    const post = await Post.findById(id);

    return res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    return res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  id = req.params.id;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.deletePost = async (req, res, next) => {
  id = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(id);

    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};
