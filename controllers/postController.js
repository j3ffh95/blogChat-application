const Post = require("../models/Post");

exports.viewCreateScreen = function (req, res) {
  res.render("create-post");
};

exports.create = function (req, res) {
  let post = new Post(req.body, req.session.user._id);
  post
    .create()
    .then(function () {
      res.send("new post created");
    })
    .catch(function (errors) {
      res.send(errors);
    });
};

exports.viewSingle = async function (req, res) {
  try {
    // we use a parent function to find the post by id
    // we use the params object to search for the id pass in the req
    let post = await Post.findSingleById(req.params.id);
    // console.log(post);
    res.render("single-post-screen", { post: post });
  } catch {
    res.send("404 template will go here.");
  }
};
