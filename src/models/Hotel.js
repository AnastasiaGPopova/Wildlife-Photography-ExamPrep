const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, "Hotel name must be at least 4 chars long"]
    }, 
    city: {
        type: String,
        required: true,
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
    freeRooms: {
        type: Number,
        required: true,
        min: [1, 'Rooms must be between 1 and 100!'],
        max: [100, 'Rooms must be between 1 and 100!'],
    },
    bookedByUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

// hotelSchema.index({name: 1}, {
//     collection: {
//         locale: 'en',
//         strength: 2,
//     }
//  })

const Hotel = mongoose.model('Hotel', hotelSchema)
module.exports = Hotel