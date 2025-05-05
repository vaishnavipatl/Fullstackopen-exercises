const express = require('express')
const app = express()
const connectDB = require('./config/dbconfig')

const cors = require ('cors')
require('dotenv').config()
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true ,
    methods: 'GET,POST,PUT,DELETE,PATCH'
}))
connectDB()
const cookieParser = require('cookie-parser')
app.use(cookieParser())


const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes)
app.use('/api/blogs' ,blogRoutes)

module.exports = app