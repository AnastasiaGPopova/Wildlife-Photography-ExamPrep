//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const hotelController = require('./controllers/hotelController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------

router.get('/', homeController.getHomePage)


//Login and Register
router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)


//hotels creation
router.get('/hotel/create', isAuthenticated, hotelController.getHotelCreationPage)
router.post('/hotel/create', isAuthenticated, hotelController.postCreatedHotel)

//Details Page
router.get('/hotel/:hotelId/details', isAuthenticated, hotelController.getDetails)


//Book
router.get('/hotel/:hotelId/book', isAuthenticated, hotelController.getBooked)

///Profile page
router.get('/profile', isAuthenticated, homeController.getProfilePage)


// //Edit Page
router.get('/hotel/:hotelId/edit', isAuthenticated,  hotelController.getEditHotelPage)
router.post('/hotel/:hotelId/edit', isAuthenticated, hotelController.postEditedHotel)

// //Delete Hotel
router.get('/hotel/:hotelId/delete', hotelController.getDeleteHotel)


router.get('/logout', authController.logout)



module.exports = router