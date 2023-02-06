const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name should be at least 3 characters long!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [5, "First name should be at least 3 characters long!"]
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        minLength: [3, 'Email should be at least 3 charecters!']
    },
    password : {
        type: String,
        required: true,
        minLength: [4, 'Password too short!']
    },
    myPosts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }]
 })

 userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
           .then(hash => {
            this.password = hash
            next()
           })
 })

 userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password, this.password) //this.password is the encrypted password. Password is the password that the user is giving
    
})

 const User = mongoose.model('User', userSchema)
 module.exports = User