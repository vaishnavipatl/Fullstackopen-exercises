import express, { json } from 'express'
const app = express()
import { connect } from 'mongoose'
import { MONGODB_URL, PORT } from './utils/config.js'
import { info, error as _error } from './utils/logger.js'
import Blogs from './model/blog.js'
import User from './model/user.js'

app.use(json())

connect(MONGODB_URL)
    .then(() => {
        info('Connected to MONGODB')
    }).catch((err)=>{
        _error('Error for Connecting:',err.message)
        process.exit(1)
    })


app.post('/api/blogs',async(req,res)=>{
    try{
        let user = await User.find({username: req.user.username})
        const {title,author,url} = req.body    
        const blog = new Blogs({
            title,
            author,
            url,
            user:req.user.userid
        })
        const saveblog = await blog.save()
        user.blog.push(blog._id)
        await user.save()
        res.status(201).json(saveblog)
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
})

app.get('/api/blogs', async(req, res) => {
    try{
        const blogs = await Blogs.find({})
        res.json(blogs)
    }   catch(error){
        res.status(400).json({error: error.message})
    }
})

app.post('/api/user' , async(req,res)=>{
    const {name , username , password} = req.body
    let user = await User.find({username})
    if(user) return res.status(500).send('username should be unique')
    bcrypt.genSalt(10 , function(err , salt){
        bcrypt.hash(password , salt , async function(err, hash){
          const user = new User({
            name ,
            username,
            password : hash
          })
          await user.save()
        res.status(201).json(user)
        })
    })
})


app.listen(PORT ,()=>{
    info(`Server running on port ${PORT}`)
})

export default app;