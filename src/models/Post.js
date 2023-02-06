const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [6, "Too short! Title should be at least 6 characters !"]
    }, 
    keyword: {
        type: String,
        required: true,
        minLength: [6, "Too short! Keyword should be at least 6 characters !"]
    },
    location: {
        type: String,
        required: true,
        maxLength: [15, "Too long! Location should be 15 characters !"]
    },
    creationDate: {
        type: String,
        required: true,
        minLength: [10, "Date should be 10 characters !"],
        maxLength: [10, "Date should be 10 characters !"]
    },
    imageUrl: {
        type: String,
        required: true,
        // match: /^https?:\/\//
        validate : {
            validator: function (value){
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "Invalid URL!"
        }
    }, 
    description: {
        type: String,
        required: true,
        minLength: [8, "Too short! Keyword should be at least 6 characters !"]
    
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
    raiting: {
        type: Number,
        default: 0
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post