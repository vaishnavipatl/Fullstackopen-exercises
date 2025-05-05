const jwt = require('jsonwebtoken')
require('dotenv').config()

function isLoggedIn(req,res,next){
    if(req.cookies.token === ''){
        return res.send("User Need to be logged in !")
    }
    else{
    let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    req.user=data
   }
    next()
}

module.exports = isLoggedIn