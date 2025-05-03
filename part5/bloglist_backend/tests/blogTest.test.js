const supertest = require('supertest')
const app = require("../server")
const mongoose = require("mongoose")
const Blog = require("../models/blogdata")
const path = require("path")

require("dotenv").config()

const api = supertest(app)

beforeAll(async()=>{
    await mongoose.connect(process.env.MONGODB_URL_TEST)
    await Blog.deleteMany({})
})

afterAll(async ()=>{
    await mongoose.connection.close()
    
})

describe('handling blogs', () => {
    test('create a blog', async () => {
      const response = await api
        .post("/api/blogs/newBlog")
        .field('title', 'blog3')
        .field('author', '67f52b444a7922e8a535f386') 
        .field('content', 'hello bye')
        .attach('image', path.join(__dirname, 'dummy.png')) 
  
      expect(response.status).toBe(201)
    },20000)

    test('get all blog' , async()=>{
      const response = await api
      .get("/api/blogs/getAllBlog")
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
    })
  })