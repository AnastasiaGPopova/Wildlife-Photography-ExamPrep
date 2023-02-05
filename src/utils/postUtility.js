const Post = require('../models/Post.js')
exports.isHotelOwner = (user, post) => {
    let isOwner = false
    if(user){
        if(user._id == hotel.owner._id){
            isOwner = true
        }
    }
   return isOwner
}


exports.isRated = async (userId, postId) => {
    let isRated = false
    const post = await Post.findById(postId)
    const reated = hotel.bookedByUsers.find(x=> x == userId )

    if(reated){
        isRated = true
    }
    return isRated
}