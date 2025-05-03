const supertest = require('supertest')
const app = require('../server')
const mongoose=require('mongoose')
const User = require('../models/userdata')
const bcrypt = require('bcrypt')

require('dotenv').config()

const api = supertest(app)

beforeAll(async ()=>{
    await mongoose.connect(process.env.MONGODB_URL_TEST)
    await User.deleteMany({})
})

afterAll(async ()=>{
    await mongoose.connection.close()
})



describe('Handling the User Account ' ,()=>{
    test('user register process ' , async()=>{
        const response = await api
          .post('/api/users/register')
          .send({
            name : 'Vaishnavi Patil',
            email :'patilvaishnavi@gmail.com',
            password:'gfjfjdjdch'
          })
        //   console.log('Response Status:', response.status);
        //   console.log('Response Body:', response.body);
          expect(response.status).toBe(201)
          expect(response.body).toHaveProperty("token");


          
          const user = await User.findOne({ email: "patilvaishnavi@gmail.com"});
          expect(user).not.toBeNull();
          const isPasswordMatch = await bcrypt.compare("gfjfjdjdch", user.password);
          expect(isPasswordMatch).toBe(true);
        
    })

    test('user login process' , async()=>{
        const response = await api
         .post('/api/users/login')
         .send({
            email :'patilvaishnavi@gmail.com',
            password:'gfjfjdjdch'
         })
         console.log(response)
         expect(response.status).toBe(200)
         expect(response.body).toHaveProperty("token");

    })

})



