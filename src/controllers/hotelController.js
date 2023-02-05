const Hotel = require('../models/Hotel.js')
const User = require('../models/User')
const hotelService = require('../services/hotelService.js')
const hotelUtility = require('../utils/hotelUtility.js')
const parser = require('../utils/parser')



exports.getHotelCreationPage = (req,res) => {
    res.render('create')
}

exports.postCreatedHotel = async (req, res) => {


    const name = req.body.hotel
    const city = req.body.city
    const freeRooms = req.body["free-rooms"]
    const imageUrl = req.body.imgUrl

    try{
        if(!name || !city || !freeRooms || !imageUrl){
            throw new Error ("All fields are requiered!")
        }
        const newHotel = new Hotel({name, city, imageUrl, freeRooms, owner: req.user._id})//encoded body-to, which we receive, will create a new cube
        //save newhotel

        await newHotel.save()
        //redirect
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors, body: req.body.username})
    }

}

exports.getDetails = async (req, res) => {

    let currentHotel = await Hotel.findById(req.params.hotelId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                .populate('owner')
                                .lean()

    const isOwner = hotelUtility.isHotelOwner(req.user, currentHotel)
    const isBooked = await hotelUtility.isBooked(req.user._id, req.params.hotelId)
  

    if(!currentHotel){
        return res.redirect('/404')
    }

    res.render('details', {currentHotel, isOwner, isBooked})

}

exports.getBooked = async (req, res) => {
    const currentHotel = await hotelService.getOneHotelByID(req.params.hotelId)
    currentHotel.bookedByUsers.push(req.user._id)
    currentHotel.freeRooms--

    await currentHotel.save()

     res.redirect(`/hotel/${req.params.hotelId}/details`)

}

exports.getEditHotelPage = async (req, res) => {


    try{
        const hotel = await hotelService.getOneHotelByID(req.params.hotelId).lean()

        //if it owner
        if(!hotelUtility.isHotelOwner(req.user, hotel)){
            res.redirect('/')
        }
        
        res.render('edit', {hotel})

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors, body: req.body.username})
    }

}


exports.postEditedHotel = async (req,res) => {

    const name = req.body.hotel
    const city = req.body.city
    const freeRooms = req.body["free-rooms"]
    const imageUrl = req.body.imgUrl

    try{
        if(!name || !city || !freeRooms || !imageUrl){
            throw new Error ("All fields are requiered!")
        }
        const updatedHotel = await hotelService.update(req.params.hotelId, {name, city, imageUrl, freeRooms})

        //redirect
        res.redirect(`/hotel/${req.params.hotelId}/details`)

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors, body: req.body.username})
    }



}



exports.getDeleteHotel = async (req, res) => {
    const hotel = await hotelService.getOneHotelByID(req.params.hotelId)

    if(!hotelUtility.isHotelOwner(req.user, hotel)){
        res.redirect('/')
    }
   const test = await hotelService.deleteHotel(req.params.hotelId)
   console.log(test)


   res.redirect('/')
}

