const Post = require('../models/Post.js')
exports.isPostOwner = (user, post) => {
    let isOwner = false
    if(user){
        if(user._id == post.autor._id){
            isOwner = true
        }
    }
   return isOwner
}



exports.isVoted = async (userId, postId) => {
    let isVoted = false
    const post = await Post.findById(postId)
    const rated = post.votesOfUsers.find(x=> x == userId )

    if(rated){
        isVoted = true
    }
    return isVoted
}