require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_URL=process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
?process.env.MONGODB_URL_TEST
:process.env.MONGODB_URL

const connectDB =async()=>{
    try{ 
     await mongoose.connect(MONGODB_URL)
     console.log('connected')
     console.log(MONGODB_URL)
     console.log(process.env.NODE_ENV ||"not set")
    }catch(error){
        console.error('not connected' , error)
    }
}

module.exports = connectDB