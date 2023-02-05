const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    keyword: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    creationDate: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        // // match: /^https?:\/\//
        // validate : {
        //     validator: function (value){
        //         return value.startsWith("http://") || value.startsWith("https://")
        //     },
        //     message: "Invalid URL!"
        // }
    }, 
    description: {
        type: String,
        required: true,
    
    },
    autor: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    // createdAt: {
    //     type: Date, default: Date.now
    // },
    votesOfUsers:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    raiting:{
        type: Number
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post