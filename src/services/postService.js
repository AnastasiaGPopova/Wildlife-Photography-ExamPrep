const Post = require('../models/Post')

exports.getOnePost = (postId) => Post.findById(postId)
exports.getAllPosts = () => Post.find()
exports.update = (postId, data) => Post.findByIdAndUpdate(courseId, data, {runValidators: true})
exports.deleteCourse = (postId) => Post.findByIdAndDelete(courseId, {runValidators: true})
