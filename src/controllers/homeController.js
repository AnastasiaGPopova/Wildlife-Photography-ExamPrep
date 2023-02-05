const Hotel = require('../models/Hotel.js')
const User = require('../models/User')
const hotelService = require('../services/hotelService')


exports.getHomePage = async (req, res) => {
    const allHotels = await hotelService.getSorted().lean()
    const top3hotels = allHotels.slice(0,3)
        res.render('home', {top3hotels})
}

exports.getProfilePage = async (req,res) => {
    const currentUser = await User.findById(req.user._id).lean()
    const bookedHotels = await Hotel.find({bookedByUsers: req.user._id}).lean()
    const hotels = bookedHotels.map(h => h.name)

    res.render('auth/profile', { currentUser, hotels })

}

// exports.getAboutPage = (req,res) => {
//     res.render('about')
// }

// exports.getErrorPage404 = (req, res) => {
//     res.render('404')
// }