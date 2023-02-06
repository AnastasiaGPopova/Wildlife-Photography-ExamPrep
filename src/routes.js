//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const postController = require('./controllers/postController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------


router.get('/', homeController.getHomePage)
router.get('/post/allPosts', homeController.getAllPostsPage)


//Login and Register
router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)


// //post creation
router.get('/post/create', isAuthenticated, postController.getPostCreationPage )
router.post('/post/create', isAuthenticated, postController.postCreatedPost)

// //Details Page
router.get('/post/:postId/details', isAuthenticated, postController.getDetails)

// //Votes
router.get('/post/:postId/voteUp', isAuthenticated, postController.voteUp)
router.get('/post/:postId/voteDown', isAuthenticated, postController.voteDown)

// //Edit page
router.get('/post/:postId/edit', isAuthenticated, postController.getEditedPage)
router.post('/post/:postId/edit', isAuthenticated, postController.postEditedPost)

//Delete post
router.get('/post/:postId/delete', isAuthenticated, postController.getDeletePost)

//Myposts
router.get('/myPosts', isAuthenticated, postController.getAllMyPosts)


router.get('/logout', authController.logout)
router.get('/404', homeController.getErrorPage404)



module.exports = router