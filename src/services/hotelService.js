const Hotel = require('../models/Hotel')

exports.getOneHotelByID = (hotelId) => Hotel.findById(hotelId)
exports.update = (hotelId, data) => Hotel.findByIdAndUpdate(hotelId, data, {runValidators: true})
exports.deleteHotel = (hotelId) => Hotel.findByIdAndDelete(hotelId, {runValidators: true})
exports.getAllHotels = () => Hotel.find()
exports.getSorted = () => Hotel.find().sort({freeRooms: -1})
