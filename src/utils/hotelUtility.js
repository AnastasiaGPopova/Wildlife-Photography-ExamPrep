const Hotel = require('../models/Hotel.js')
exports.isHotelOwner = (user, hotel) => {
    let isOwner = false
    if(user){
        if(user._id == hotel.owner._id){
            isOwner = true
        }
    }
   return isOwner
}


exports.isBooked = async (userId, hotelId) => {
    let isBooked = false
    const hotel = await Hotel.findById(hotelId)
    const bookedHotels = hotel.bookedByUsers.find(x=> x == userId )

    if(bookedHotels){
        isBooked = true
    }
    return isBooked
}