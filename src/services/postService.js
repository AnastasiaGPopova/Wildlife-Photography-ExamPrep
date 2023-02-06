const Post = require('../models/Post')

exports.getOnePost = (postId) => Post.findById(postId)
exports.getAllPosts = () => Post.find()
exports.update = (postId, data) => Post.findByIdAndUpdate(postId, data, {runValidators: true})
exports.deletePost = (postId) => Post.findByIdAndDelete(postId, {runValidators: true})
