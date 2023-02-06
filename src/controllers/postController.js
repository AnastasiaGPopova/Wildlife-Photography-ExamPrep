const Post = require('../models/Post.js')
const User = require('../models/User')
const postService = require('../services/postService')
const postlUtility = require('../utils/postUtility')
const parser = require('../utils/parser')



exports.getPostCreationPage = (req,res) => {
    res.render('create')
}

exports.postCreatedPost = async (req, res) => {
 const {title, keyword, location, creationDate, imageUrl, description} = req.body

    try{
        if(!title || !keyword || !location || !creationDate || !imageUrl || !description){
            throw new Error ("All fields are requiered!")
        }
        const newPost = new Post({title, keyword, location, creationDate, imageUrl, description, autor: req.user._id})//encoded body-to, which we receive, will create a new cube
        //save newhotel
        console.log(newPost)
        await newPost.save()
        //redirect
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors, body: req.body.email})
    }

}

exports.getDetails = async (req, res) => {

    let currentPost = await postService.getOnePost(req.params.postId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                       .populate('votesOfUsers') 
                                       .populate('autor')         
                                       .lean()

    const isOwner = postlUtility.isPostOwner(req.user, currentPost)
    const isVoted= await postlUtility.isVoted(req.user._id, req.params.postId)
    const allVotedUsers = currentPost.votesOfUsers.map(x =>x.email).join(', ')

    let isRated = true
    if(allVotedUsers.length == 0){
        isRated = false
    }
    currentRaiting = currentPost.raiting
    

    if(!currentPost){
        return res.redirect('/404')
    }

    res.render('details', {currentPost, isOwner, isVoted, currentRaiting, isRated, allVotedUsers})

}

exports.voteUp = async (req,res) =>{
    const currentPost = await postService.getOnePost(req.params.postId)
    currentPost.votesOfUsers.push(req.user._id)
    currentPost.raiting++
    await currentPost.save()
    res.redirect(`/post/${req.params.postId}/details`)

}


exports.voteDown = async (req,res) =>{
    const currentPost = await postService.getOnePost(req.params.postId)
    currentPost.votesOfUsers.push(req.user._id)
    currentPost.raiting--
    await currentPost.save()

    res.redirect(`/post/${req.params.postId}/details`)

}

exports.getEditedPage = async (req,res) => {
    const currentPost = await postService.getOnePost(req.params.postId).lean()

    res.render('edit', {currentPost})
}


exports.postEditedPost = async (req,res) => {
    const {title, keyword, location, creationDate, imageUrl, description} = req.body

    try{
        if(!title || !keyword || !location || !creationDate || !imageUrl || !description){
            throw new Error ("All fields are requiered!")
        }
        const updatedPost = await postService.update(req.params.postId, {title, keyword, location, creationDate, imageUrl, description})//encoded body-to, which we receive, will create a new cube

        console.log(updatedPost)

        res.redirect(`/post/${req.params.postId}/details`)

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors, body: req.body.email})
    }
}


// exports.getBooked = async (req, res) => {
//     const currentHotel = await hotelService.getOneHotelByID(req.params.hotelId)
//     currentHotel.bookedByUsers.push(req.user._id)
//     currentHotel.freeRooms--

//     await currentHotel.save()

//      res.redirect(`/hotel/${req.params.hotelId}/details`)

// }

// exports.getEditHotelPage = async (req, res) => {


//     try{
//         const hotel = await hotelService.getOneHotelByID(req.params.hotelId).lean()

//         //if it owner
//         if(!hotelUtility.isHotelOwner(req.user, hotel)){
//             res.redirect('/')
//         }
        
//         res.render('edit', {hotel})

//     } catch(error){
//         const errors = parser.parseError(error)
//         res.render('create', {errors, body: req.body.username})
//     }

// }


// exports.postEditedHotel = async (req,res) => {

//     const name = req.body.hotel
//     const city = req.body.city
//     const freeRooms = req.body["free-rooms"]
//     const imageUrl = req.body.imgUrl

//     try{
//         if(!name || !city || !freeRooms || !imageUrl){
//             throw new Error ("All fields are requiered!")
//         }
//         const updatedHotel = await hotelService.update(req.params.hotelId, {name, city, imageUrl, freeRooms})

//         //redirect
//         res.redirect(`/hotel/${req.params.hotelId}/details`)

//     } catch(error){
//         const errors = parser.parseError(error)
//         res.render('create', {errors, body: req.body.username})
//     }



// }



// exports.getDeleteHotel = async (req, res) => {
//     const hotel = await hotelService.getOneHotelByID(req.params.hotelId)

//     if(!hotelUtility.isHotelOwner(req.user, hotel)){
//         res.redirect('/')
//     }
//    const test = await hotelService.deleteHotel(req.params.hotelId)
//    console.log(test)


//    res.redirect('/')
// }

