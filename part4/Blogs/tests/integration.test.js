import {test , after , beforeEach ,describe} from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'
import Blog from '../model/blog.js'
import assert from 'node:assert/strict';

const api = supertest(app)
const initialBlogs = [
    {
      title: 'First Blog',
      author: 'John Doe',
      url: 'http://example.com/first',
      likes: 5,
    },
    {
      title: 'Second Blog',
      author: 'Jane Doe',
      url: 'http://example.com/second',
      likes: 10,
    },
];



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})


describe("Blog API" ,()=>{
  test("returned the initial store blogs" , async()=>{
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type' , /application\/json/)
    assert(response.body, initialBlogs.length)
  })
   

  test("test to create new blog" , async () => {
    const newBlog = {
      title: 'Third Blog',
      author: 'Jane Doe',
      url: 'http://example.com/second',
      likes: 11,
    }
    await api 
     .post('/api/blogs')
     .send(newBlog)
     .expect(201)
     .expect('Content-Type' , /application\/json/)

     const response = await api.get('/api/blogs')
     const content = response.body.map(blog=> blog.content)
     assert(content.includes(newBlog.content))
     assert.deepStrictEqual(response.body.length, initialBlogs.length+1)
  })

  
})


after(async () => {
      await mongoose.connection.close();
    })
    



  