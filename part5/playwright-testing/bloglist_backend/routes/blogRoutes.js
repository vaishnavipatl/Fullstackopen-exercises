//blogRoutes.js

const express =require('express')
const router = express.Router()
const {newBlog ,allBlog ,likeblog ,addcomment,blogDelete} = require('../controllers/blogController')
const isLoggedIn = require("../middleware/authMiddleware")
const upload = require('../config/multer_config')

router.get('/getAllBlog' , allBlog)
router.post('/newBlog' ,isLoggedIn,upload.single('image'), newBlog)
router.patch('/like/:id',isLoggedIn,likeblog)
router.post('/comment/:id',isLoggedIn ,addcomment)
router.delete('/delete/:id' , isLoggedIn , blogDelete)

module.exports = router